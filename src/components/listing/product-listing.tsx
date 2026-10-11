import Link from "next/link";

import { ListingBanner } from "@/components/listing/listing-banner";
import { ProductCard } from "@/components/product/product-card";
import { getListingContent, type Product } from "@/lib/catalog";

/** A listing page: banner (or a plain title when the slug has no editorial content), then the grid. */
export function ProductListing({
  slug,
  title,
  products,
}: {
  slug: string;
  title: string;
  products: Product[];
}) {
  const content = getListingContent(slug);

  return (
    <>
      {content && <ListingBanner title={title} content={content} />}

      <div className="container-page pb-section">
        <header
          className={`flex flex-col gap-3 border-b border-line px-1 sm:px-0 ${content ? "py-5" : "pt-4 pb-stack lg:pt-8"}`}
        >
          <div className="flex items-baseline justify-between gap-6">
            <nav aria-label="Breadcrumb">
              <ol className="label flex gap-2 text-muted">
                <li>
                  <Link href="/" className="link-reveal">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{title}</li>
              </ol>
            </nav>
            {products.length > 0 && (
              <p className="label numeric shrink-0 text-muted">
                {products.length} {products.length === 1 ? "piece" : "pieces"}
              </p>
            )}
          </div>
          {!content && <h1 className="text-title">{title}</h1>}
        </header>

        {products.length > 0 ? (
          <div className="grid-products pt-stack">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 py-section text-center">
            <p className="text-heading">Nothing here just yet</p>
            <p className="max-w-prose text-body text-muted">
              New pieces arrive throughout the season, so check back soon.
            </p>
            <Link href="/" className="btn btn-secondary mt-4">
              Back to the homepage
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
