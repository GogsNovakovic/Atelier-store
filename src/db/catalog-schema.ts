// Catalogue tables: products, their categories and per-size stock.
// Kept apart from schema.ts because `npm run auth:generate` rewrites that file whole.
import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgTable,
  smallint,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import type { CatalogImage } from "@/lib/catalog";

export const categories = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: text().notNull().unique(),
  name: text().notNull(),
});

export const products = pgTable(
  "products",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: text().notNull().unique(),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    name: text().notNull(),
    /** EUR, in cents. */
    priceCents: integer("price_cents").notNull(),
    colour: text().notNull(),
    description: text().notNull(),
    details: text().array().notNull().default(sql`'{}'::text[]`),
    /** In display order; the first is the primary image used on product cards. */
    images: jsonb().$type<CatalogImage[]>().notNull(),
    isNew: boolean("is_new").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    index("products_category_id_idx").on(t.categoryId),
    check("products_price_cents_non_negative", sql`${t.priceCents} >= 0`),
    check("products_images_not_empty", sql`jsonb_array_length(${t.images}) > 0`),
  ],
);

/**
 * Units on hand per size. A product with no size choice (bags, jewellery, eyewear)
 * has a single row with a NULL size. Sizes are labels only, not variants.
 */
export const productStock = pgTable(
  "product_stock",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    size: text(),
    /** Display order of the size run (XS before S, 39 before 40). */
    position: smallint().notNull().default(0),
    quantity: integer().notNull().default(0),
  },
  (t) => [
    unique("product_stock_product_id_size_unique").on(t.productId, t.size).nullsNotDistinct(),
    check("product_stock_quantity_non_negative", sql`${t.quantity} >= 0`),
  ],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  stock: many(productStock),
}));

export const productStockRelations = relations(productStock, ({ one }) => ({
  product: one(products, { fields: [productStock.productId], references: [products.id] }),
}));
