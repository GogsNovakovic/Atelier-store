import Link from "next/link";

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="section container-narrow text-center">
      <p className="label text-muted">The collection</p>
      <h2 id="intro-title" className="mt-6 text-title">
        Coats cut to be worn for years. Knits that soften with every winter. A wardrobe
        built slowly, one piece at a time.
      </h2>
      <Link href="/collections/autumn-winter-2026" className="link-cta mt-stack inline-block">
        Explore the collection
      </Link>
    </section>
  );
}
