import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { StockStatus } from "@/components/product/stock-status";
import { PlusIcon } from "@/components/ui/icons";
import { formatPrice, getStockState, services } from "@/lib/catalog";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/products";

// Prerender every product at build, then refresh at most once a minute so stock stays current.
// Products added later render on first request; unknown slugs 404.
export const revalidate = 60;

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [{ url: product.image.src, alt: product.image.alt }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const stock = getStockState(product);
  const related = await getRelatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [product.image.src, ...product.gallery.map((image) => image.src)],
    category: product.category.name,
    color: product.colour,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability:
        stock.status === "sold-out"
          ? "https://schema.org/OutOfStock"
          : stock.status === "low-stock"
            ? "https://schema.org/LimitedAvailability"
            : "https://schema.org/InStock",
    },
  };

  const accordion = [
    { title: "Description", body: <p>{product.description}</p> },
    {
      title: "Details and care",
      body: (
        <ul className="flex list-disc flex-col gap-1 pl-4 marker:text-subtle">
          {product.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Delivery and returns",
      body: (
        <ul className="flex flex-col gap-3">
          {services.map((service) => (
            <li key={service.title}>
              <span className="text-ink">{service.title}.</span> {service.body}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so catalogue text can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="container-page grid-editorial pt-4 pb-section lg:pt-8">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <ProductGallery images={[product.image, ...product.gallery]} />
        </div>

        <div className="col-span-4 md:col-span-8 md:max-w-xl lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <div className="flex flex-col gap-8 lg:sticky lg:top-header lg:pt-8">
            <div className="flex flex-col gap-3">
              <nav aria-label="Breadcrumb">
                <ol className="label flex gap-2 text-muted">
                  <li>
                    <Link href="/" className="link-reveal">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href={`/${product.category.slug}`} className="link-reveal">
                      {product.category.name}
                    </Link>
                  </li>
                </ol>
              </nav>
              <h1 className="text-title">{product.name}</h1>
              <p className="numeric text-heading">{formatPrice(product.price)}</p>
            </div>

            <div className="flex flex-col gap-3 border-t border-line pt-6">
              <p className="text-ui">
                <span className="text-muted">Colour</span> {product.colour}
              </p>
              <StockStatus state={stock} />
            </div>

            <PurchasePanel
              productName={product.name}
              sizes={product.sizes}
              soldOut={stock.status === "sold-out"}
            />

            <div className="border-t border-line">
              {accordion.map((item, index) => (
                <details
                  key={item.title}
                  open={index === 0}
                  className="group border-b border-line"
                >
                  <summary className="label flex min-h-14 cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                    {item.title}
                    <PlusIcon
                      width={16}
                      height={16}
                      className="transition-transform duration-300 ease-luxe group-open:rotate-45"
                    />
                  </summary>
                  <div className="pb-6 text-ui text-muted">{item.body}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="related-title" className="container-page pb-section">
        <h2 id="related-title" className="mb-stack px-1 text-title sm:px-0">
          You may also like
        </h2>
        <div className="grid-products">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </>
  );
}
