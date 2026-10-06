import Link from "next/link";

import { ProductCard } from "@/components/product/product-card";
import { newArrivals } from "@/lib/catalog";

export function NewArrivals() {
  return (
    <section aria-labelledby="new-arrivals-title" className="container-page pb-section">
      <div className="mb-stack flex items-baseline justify-between gap-6 px-1 sm:px-0">
        <h2 id="new-arrivals-title" className="text-title">
          New arrivals
        </h2>
        <Link href="/new-arrivals" className="link-cta shrink-0">
          View all
        </Link>
      </div>

      <div className="grid-products">
        {newArrivals.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
