import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section container-narrow flex flex-col items-center gap-6 text-center">
      <p className="label text-muted">Page not found</p>
      <h1 className="text-title">This page isn&rsquo;t here yet</h1>
      <p className="max-w-prose text-body text-muted">
        The storefront is still being built, so some links lead to pages that don&rsquo;t
        exist yet.
      </p>
      <Link href="/" className="btn btn-secondary mt-4">
        Back to the homepage
      </Link>
    </section>
  );
}
