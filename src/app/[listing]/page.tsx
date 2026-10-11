import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { ProductListing } from "@/components/listing/product-listing";
import {
  curatedListingSlugs,
  getCuratedListing,
  getListingContent,
  type ProductFilter,
} from "@/lib/catalog";
import { getCategory, getCategorySlugs, getListingProducts } from "@/lib/products";

// Women, Men and Gifts, plus one page per catalogue category (/bags, /outerwear…).
// Static routes such as /new-arrivals and /products win over this segment. Prerendered at
// build, refreshed at most once a minute; categories added later render on demand.
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = new Set([...curatedListingSlugs, ...(await getCategorySlugs())]);
  return [...slugs].map((listing) => ({ listing }));
}

/** Curated pages first, then a database category. Unknown slugs resolve to undefined. */
const resolveListing = cache(
  async (slug: string): Promise<{ title: string; filter: ProductFilter } | undefined> => {
    const curated = getCuratedListing(slug);
    if (curated) return curated;
    const category = await getCategory(slug);
    return category && { title: category.name, filter: { categories: [category.slug] } };
  },
);

export async function generateMetadata({
  params,
}: PageProps<"/[listing]">): Promise<Metadata> {
  const slug = (await params).listing;
  const listing = await resolveListing(slug);
  if (!listing) return {};
  const content = getListingContent(slug);
  return {
    title: listing.title,
    description: content?.description,
    openGraph: content && { images: [{ url: content.banner.src, alt: content.banner.alt }] },
  };
}

export default async function ListingPage({ params }: PageProps<"/[listing]">) {
  const slug = (await params).listing;
  const listing = await resolveListing(slug);
  if (!listing) notFound();

  const products = await getListingProducts(listing.filter);
  return <ProductListing slug={slug} title={listing.title} products={products} />;
}
