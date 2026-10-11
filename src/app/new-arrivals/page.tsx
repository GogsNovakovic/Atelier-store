import type { Metadata } from "next";

import { ProductListing } from "@/components/listing/product-listing";
import { getNewArrivals } from "@/lib/products";

// Same source and order as the homepage section, refreshed at most once a minute.
export const revalidate = 60;

/** The listing has no pagination yet, so it shows the most recent pieces only. */
const LIMIT = 24;

export const metadata: Metadata = {
  title: "New arrivals",
  description: "The latest outerwear, knitwear, bags and jewellery from Atelier, newest first.",
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivals(LIMIT);
  return <ProductListing slug="new-arrivals" title="New arrivals" products={products} />;
}
