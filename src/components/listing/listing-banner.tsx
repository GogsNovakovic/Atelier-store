import Image from "next/image";

import type { ListingContent } from "@/lib/catalog";

// Portrait on phones (the product ratio), a wide band from tablet up. Copy sits bottom-left
// over a scrim, in line with the page gutter.
export function ListingBanner({ title, content }: { title: string; content: ListingContent }) {
  return (
    <section
      aria-labelledby="listing-title"
      className="relative flex aspect-product items-end overflow-hidden bg-ink text-canvas md:aspect-auto md:h-[60svh] md:min-h-112 md:max-h-200"
    >
      <Image
        src={content.banner.src}
        alt={content.banner.alt}
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="object-cover"
        style={{ objectPosition: content.banner.focus }}
      />

      {/* Scrim keeps the copy above 4.5:1 on light photography too. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent"
      />

      <div className="container-page relative flex flex-col items-start gap-4 pb-12 md:pb-16">
        <p className="label">{content.eyebrow}</p>
        <h1 id="listing-title" className="text-display">
          {title}
        </h1>
        <p className="max-w-prose text-body">{content.description}</p>
      </div>
    </section>
  );
}
