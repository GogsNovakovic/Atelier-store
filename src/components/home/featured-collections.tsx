import Image from "next/image";
import Link from "next/link";

import { collections } from "@/lib/catalog";

// Asymmetric pair: a wide lead image and a narrower one dropped half a section lower.
const layout = [
  {
    span: "col-span-4 md:col-span-5 lg:col-span-7",
    sizes: "(min-width: 64rem) 58vw, (min-width: 48rem) 62vw, 100vw",
  },
  {
    span: "col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9 md:mt-section",
    sizes: "(min-width: 64rem) 33vw, (min-width: 48rem) 38vw, 100vw",
  },
];

export function FeaturedCollections() {
  return (
    <section aria-labelledby="collections-title" className="container-page pb-section">
      <h2 id="collections-title" className="label-lg mb-stack">
        Featured collections
      </h2>

      <div className="grid-editorial gap-y-14">
        {collections.map((collection, index) => (
          <article key={collection.slug} className={`group relative ${layout[index].span}`}>
            <div className="media-stage aspect-portrait">
              <Image
                src={collection.image.src}
                alt={collection.image.alt}
                fill
                sizes={layout[index].sizes}
                className="transition-transform duration-1000 ease-luxe group-hover:scale-[1.02]"
              />
            </div>
            <div className="mt-5 flex flex-col items-start gap-2">
              <p className="label text-muted">{collection.eyebrow}</p>
              <h3 className="text-heading">{collection.title}</h3>
              <p className="max-w-prose text-ui text-muted">{collection.description}</p>
              <Link
                href={`/collections/${collection.slug}`}
                className="link-cta mt-3 after:absolute after:inset-0"
              >
                {collection.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
