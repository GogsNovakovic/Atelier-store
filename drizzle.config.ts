import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: [".env.local", ".env"] });

export default defineConfig({
  schema: ["./src/db/schema.ts", "./src/db/catalog-schema.ts"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // The owner role: the app's DATABASE_URL role cannot run DDL.
    url: (process.env.DATABASE_MIGRATION_URL ?? process.env.DATABASE_URL)!,
  },
});
