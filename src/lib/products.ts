import "server-only";

import { asc, sql } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { categories, products, productStock } from "@/db/catalog-schema";
import type { Product } from "@/lib/catalog";

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

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  const rows = await db.query.products.findMany({
    with: withRelations,
    orderBy: (p, { asc, desc }) => [desc(p.createdAt), asc(p.id)],
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
