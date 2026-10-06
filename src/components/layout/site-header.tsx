import Link from "next/link";

import { MenuDrawer } from "@/components/layout/menu-drawer";
import { AccountIcon, BagIcon, SearchIcon } from "@/components/ui/icons";
import { primaryNav } from "@/lib/catalog";

const accountLinks = [
  { label: "Sign in", href: "/account" },
  { label: "Saved items", href: "/saved" },
  { label: "Contact", href: "/contact" },
] as const;

const iconLink = "btn btn-ghost size-11 px-0";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas">
      <div className="container-page grid h-header grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex items-center">
          <div className="lg:hidden">
            <MenuDrawer primary={primaryNav} secondary={accountLinks} />
          </div>
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex gap-5 xl:gap-7">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="label link-reveal">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Link
          href="/"
          aria-label="Atelier, home"
          className="wordmark pl-(--tracking-wordmark) text-heading"
        >
          Atelier
        </Link>

        <div className="-mr-3 flex items-center justify-end">
          <Link href="/search" className={iconLink} aria-label="Search">
            <SearchIcon />
          </Link>
          <Link
            href="/account"
            className={`${iconLink} hidden sm:inline-flex`}
            aria-label="Account"
          >
            <AccountIcon />
          </Link>
          <Link href="/bag" className={iconLink} aria-label="Shopping bag">
            <BagIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}
