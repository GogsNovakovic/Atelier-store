import Image from "next/image";
import Link from "next/link";

import { categoryTiles } from "@/lib/catalog";

// Phones: a swipeable rail that bleeds to the screen edge. Tablet up: four equal columns.
export function Categories() {
  return (
    <section aria-labelledby="categories-title" className="section container-page">
      <h2 id="categories-title" className="mb-stack text-title">
        Shop by category
      </h2>

      <ul className="scroller-x -mx-gutter gap-1 px-gutter scroll-px-gutter md:mx-0 md:grid md:grid-cols-4 md:px-0">
        {categoryTiles.map((category) => (
          <li key={category.slug} className="w-3/4 sm:w-2/5 md:w-auto">
            <Link
              href={`/${category.slug}`}
              className="group media-stage block aspect-portrait text-canvas"
            >
              <Image
                src={category.image.src}
                alt=""
                fill
                sizes="(min-width: 48rem) 25vw, 75vw"
                className="transition-transform duration-1000 ease-luxe group-hover:scale-[1.03]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/10 via-40% to-transparent"
              />
              <span className="label-lg absolute bottom-5 left-5">{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
