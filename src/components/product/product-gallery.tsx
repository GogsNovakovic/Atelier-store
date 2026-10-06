import Image from "next/image";

import type { CatalogImage } from "@/lib/catalog";

// Phones and tablets: a swipeable rail that bleeds to the screen edge, the next frame peeking in.
// Desktop: the lead image full width, further views two-up beneath it (a lone last view spans both).
export function ProductGallery({ images }: { images: CatalogImage[] }) {
  return (
    <ul
      aria-label="Product images"
      className="scroller-x -mx-gutter gap-1 lg:mx-0 lg:grid lg:grid-cols-2 lg:overflow-visible"
    >
      {images.map((image, index) => {
        const isLead = index === 0;
        const spansBoth = isLead || (index === images.length - 1 && (images.length - 1) % 2 === 1);
        return (
          <li
            key={image.src}
            className={`w-5/6 sm:w-3/5 lg:w-auto ${spansBoth ? "lg:col-span-2" : ""}`}
          >
            <div className="media-stage aspect-product">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  spansBoth
                    ? "(min-width: 64rem) 58vw, (min-width: 40rem) 60vw, 84vw"
                    : "(min-width: 64rem) 29vw, (min-width: 40rem) 60vw, 84vw"
                }
                {...(isLead ? { loading: "eager", fetchPriority: "high" } : {})}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
