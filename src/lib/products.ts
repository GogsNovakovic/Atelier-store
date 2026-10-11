import "server-only";

import { asc, desc, inArray, sql } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { categories, products, productStock } from "@/db/catalog-schema";
import { isSlug, type Product, type ProductFilter } from "@/lib/catalog";

type ProductRow = typeof products.$inferSelect & {
  category: typeof categories.$inferSelect;
  stock: (typeof productStock.$inferSelect)[];
};

const withRelations = {
  category: true as const,
  stock: { orderBy: [asc(productStock.position)] },
};

function toProduct(row: ProductRow): Product {
  const [image, ...gallery] = row.images;
  // A lone NULL-size row means the product has no size choice.
  const hasSizes = row.stock.some((entry) => entry.size !== null);
  return {
    slug: row.slug,
    name: row.name,
    category: { id: row.category.id, slug: row.category.slug, name: row.category.name },
    department: row.department,
    price: row.priceCents / 100,
    colour: row.colour,
    description: row.description,
    details: row.details,
    stock: row.stock.reduce((total, entry) => total + entry.quantity, 0),
    sizes: hasSizes
      ? row.stock.map((entry) => ({ label: entry.size ?? "", available: entry.quantity > 0 }))
      : undefined,
    image,
    gallery,
    isNew: row.isNew,
  };
}

/** Cached per request, so metadata and the page share one query. */
export const getProduct = cache(async (slug: string): Promise<Product | undefined> => {
  // A slug the database could never hold 404s without a query: no 500 on bytes like
  // %00 that Postgres rejects, and no database round trip for junk URLs.
  if (!isSlug(slug)) return undefined;
  const row = await db.query.products.findFirst({
    where: (p, { eq }) => eq(p.slug, slug),
    with: withRelations,
  });
  return row ? toProduct(row) : undefined;
});

export async function getProductSlugs(): Promise<string[]> {
  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((row) => row.slug);
}

export async function getCategorySlugs(): Promise<string[]> {
  const rows = await db.select({ slug: categories.slug }).from(categories);
  return rows.map((row) => row.slug);
}

/** Cached per request, so metadata and the page share one query. */
export const getCategory = cache(
  async (slug: string): Promise<{ slug: string; name: string } | undefined> => {
    if (!isSlug(slug)) return undefined;
    return db.query.categories.findFirst({
      columns: { slug: true, name: true },
      where: (c, { eq }) => eq(c.slug, slug),
    });
  },
);

/** Newest first; ties (rows seeded together) keep catalogue order. */
const newestFirst = { orderBy: [desc(products.createdAt), asc(products.id)] };

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  const rows = await db.query.products.findMany({ with: withRelations, ...newestFirst, limit });
  return rows.map(toProduct);
}

/** A listing page's products, newest first. Women and Men include unisex pieces. */
export async function getListingProducts(filter: ProductFilter, limit = 48): Promise<Product[]> {
  const rows = await db.query.products.findMany({
    where: (p, { inArray: within }) =>
      "department" in filter
        ? within(p.department, [filter.department, "unisex"])
        : within(
            p.categoryId,
            db
              .select({ id: categories.id })
              .from(categories)
              .where(inArray(categories.slug, filter.categories)),
          ),
    with: withRelations,
    ...newestFirst,
    limit,
  });
  return rows.map(toProduct);
}

/** Same category first, then the rest of the catalogue, excluding the product itself. */
export async function getRelatedProducts(product: Product, count = 4): Promise<Product[]> {
  const rows = await db.query.products.findMany({
    where: (p, { ne }) => ne(p.slug, product.slug),
    with: withRelations,
    orderBy: (p, { asc, desc }) => [desc(sql`${p.categoryId} = ${product.category.id}`), asc(p.id)],
    limit: count,
  });
  return rows.map(toProduct);
}
