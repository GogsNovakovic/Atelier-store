// Loads the sample catalogue: `npm run db:seed`. Safe to re-run: categories and products
// are upserted on slug, and each seeded product's stock rows are replaced.
import { inArray, sql } from "drizzle-orm";

import { categories, products, productStock } from "./catalog-schema";
import { db } from "./index";
import { seedCategories, seedProducts } from "./seed-data";

function lookup(ids: Map<string, number>, slug: string): number {
  const id = ids.get(slug);
  if (id === undefined) throw new Error(`Unknown slug in seed data: ${slug}`);
  return id;
}

async function main() {
  const categoryRows = await db
    .insert(categories)
    .values(seedCategories)
    .onConflictDoUpdate({ target: categories.slug, set: { name: sql`excluded.name` } })
    .returning({ id: categories.id, slug: categories.slug });
  const categoryIds = new Map(categoryRows.map((row) => [row.slug, row.id]));

  const productRows = await db
    .insert(products)
    .values(
      seedProducts.map((product) => ({
        slug: product.slug,
        categoryId: lookup(categoryIds, product.category),
        name: product.name,
        priceCents: product.priceCents,
        colour: product.colour,
        description: product.description,
        details: product.details,
        images: product.images,
        isNew: product.isNew ?? false,
      })),
    )
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        categoryId: sql`excluded.category_id`,
        name: sql`excluded.name`,
        priceCents: sql`excluded.price_cents`,
        colour: sql`excluded.colour`,
        description: sql`excluded.description`,
        details: sql`excluded.details`,
        images: sql`excluded.images`,
        isNew: sql`excluded.is_new`,
        updatedAt: sql`now()`,
      },
    })
    .returning({ id: products.id, slug: products.slug });
  const productIds = new Map(productRows.map((row) => [row.slug, row.id]));

  const stockRows = seedProducts.flatMap((product) =>
    product.stock.map(([size, quantity], position) => ({
      productId: lookup(productIds, product.slug),
      size,
      position,
      quantity,
    })),
  );

  // Neon HTTP has no interactive transactions, but a batch runs as one.
  await db.batch([
    db.delete(productStock).where(inArray(productStock.productId, [...productIds.values()])),
    db.insert(productStock).values(stockRows),
  ]);

  console.log(
    `Seeded ${categoryRows.length} categories, ${productRows.length} products, ${stockRows.length} stock rows.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
