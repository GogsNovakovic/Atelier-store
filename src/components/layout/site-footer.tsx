import Link from "next/link";

import { NewsletterForm } from "@/components/layout/newsletter-form";
import { Logo } from "@/components/ui/logo";
import { footerNav } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-canvas">
      <div className="container-page grid-editorial py-section">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <h2 className="text-heading">Letters from the atelier</h2>
          <p className="mt-2 max-w-prose text-ui text-canvas/70">
            New collections, store openings and the occasional invitation.
          </p>
          <div className="mt-stack max-w-md">
            <NewsletterForm />
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="col-span-4 grid grid-cols-2 gap-x-gutter gap-y-10 md:col-span-8 md:grid-cols-3 lg:col-span-6 lg:col-start-7"
        >
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="label text-canvas/70">{group.title}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-ui link-reveal">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-canvas/15">
        <div className="container-page flex flex-col gap-3 py-8 text-ui text-canvas/70 md:flex-row md:items-center md:justify-between">
          <Logo title="Atelier" className="h-3 w-auto text-canvas" />
          <p>
            Atelier is a fictional store built as a demo. Photography from{" "}
            <a href="https://unsplash.com" className="link text-canvas">
              Unsplash
            </a>
            .
          </p>
          <p>© 2026 Atelier</p>
        </div>
      </div>
    </footer>
  );
}
