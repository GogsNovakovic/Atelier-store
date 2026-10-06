import Image from "next/image";
import Link from "next/link";

import { hero } from "@/lib/catalog";

// Signature: a two-panel diptych (women | men) with one title set across the seam.
// Phones show the first panel only; both destinations stay one tap away below the title.
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative grid h-hero min-h-128 overflow-hidden bg-ink text-canvas md:grid-cols-2"
    >
      {hero.panels.map((panel, index) => (
        <Link
          key={panel.href}
          href={panel.href}
          // Mouse shortcut only; the labelled links below carry keyboard and screen reader users.
          tabIndex={-1}
          aria-hidden="true"
          className={`relative block overflow-hidden ${index > 0 ? "hidden md:block" : ""}`}
        >
          <Image
            src={panel.image.src}
            alt={panel.image.alt}
            fill
            sizes="(min-width: 48rem) 50vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="animate-settle object-cover"
          />
        </Link>
      ))}

      {/* Scrim keeps the title above 4.5:1 on any crop of the photography. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 px-gutter pb-12 text-center md:pb-16">
        <p className="label animate-rise [animation-delay:300ms]">{hero.eyebrow}</p>
        <h1 id="hero-title" className="animate-rise text-display [animation-delay:450ms]">
          {hero.title}
        </h1>
        <ul className="pointer-events-auto mt-2 flex animate-rise gap-8 [animation-delay:600ms]">
          {hero.panels.map((panel) => (
            <li key={panel.href}>
              <Link href={panel.href} className="link-cta">
                {panel.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
