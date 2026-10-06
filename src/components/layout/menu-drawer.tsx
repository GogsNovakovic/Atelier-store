"use client";

import Link from "next/link";
import { useRef } from "react";

import { CloseIcon, MenuIcon } from "@/components/ui/icons";

type NavLink = { label: string; href: string };

export function MenuDrawer({
  primary,
  secondary,
}: {
  primary: readonly NavLink[];
  secondary: readonly NavLink[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className="btn btn-ghost -ml-3 px-3"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
      >
        <MenuIcon />
        <span className="sr-only sm:not-sr-only">Menu</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        // Click on the backdrop (the dialog element itself) closes it.
        onClick={(event) => event.target === event.currentTarget && close()}
        className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-full max-w-md bg-canvas p-0 text-ink transition-[translate,overlay,display] transition-discrete duration-500 ease-luxe -translate-x-full open:translate-x-0 backdrop:bg-ink/40 backdrop:opacity-0 backdrop:transition-[opacity,overlay,display] backdrop:transition-discrete backdrop:duration-500 open:backdrop:opacity-100 starting:open:-translate-x-full starting:open:backdrop:opacity-0"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-header items-center justify-between border-b border-line px-gutter">
            <span className="label">Menu</span>
            <button
              type="button"
              className="btn btn-ghost -mr-3 px-3"
              onClick={close}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 overflow-y-auto px-gutter py-stack">
            <ul className="flex flex-col gap-1">
              {primary.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block py-2 text-title"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex flex-col gap-4 border-t border-line px-gutter py-stack">
            {secondary.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className="label-lg link-reveal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
