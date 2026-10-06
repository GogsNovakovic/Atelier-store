# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

Next.js 16 (App Router, `src/` dir, Turbopack) + React 19, TypeScript, Tailwind CSS v4 (CSS-first config via `@import "tailwindcss"` in `src/app/globals.css`; there is no `tailwind.config`), Better Auth, Drizzle ORM, Postgres on Neon. Path alias `@/*` → `src/*`.

Built so far: the global design system and the homepage. There is no domain schema or auth method yet. Most linked routes (categories, products, account, bag) don't exist yet and fall through to `src/app/not-found.tsx`.

## Commands

```bash
npm run dev            # dev server
npm run build          # production build (needs DATABASE_URL set, see below)
npm run lint           # eslint (flat config, eslint-config-next)
npm run typecheck      # tsc --noEmit
npm run auth:generate  # regenerate Better Auth tables into src/db/schema.ts (CLI package is `auth`, not `@better-auth/cli`)
npm run db:generate    # drizzle-kit: create SQL migration in ./drizzle
npm run db:migrate     # apply migrations
npm run db:push        # push schema directly (dev)
npm run db:studio      # Drizzle Studio
```

There is no test framework yet.

`typecheck` relies on Next-generated route types in `.next/types` (e.g. global `LayoutProps`). If `.next` is missing, run `npx next typegen` (or `dev`/`build`) first.

## Architecture

- **Database:** `src/db/index.ts` exports a single `db`, using the Neon HTTP driver (`drizzle-orm/neon-http`), so it is stateless and has no interactive transactions. It throws at module load if `DATABASE_URL` is unset, which makes `next build` fail without env vars. All tables live in `src/db/schema.ts`; both the Drizzle client and the Better Auth adapter import it as `* as schema`.
- **Auth:** `src/lib/auth.ts` is the server instance (`drizzleAdapter(db, { provider: "pg", schema })`). Keep `nextCookies()` as the **last** plugin so cookies set in server actions work. `src/app/api/auth/[...all]/route.ts` mounts the handler. `src/lib/auth-client.ts` is the React client (`baseURL` from `NEXT_PUBLIC_APP_URL`). After changing Better Auth options or plugins, run `auth:generate` and then a db migration/push.
- **Env:** see `.env.example`. Variables go in `.env.local`, which Next reads; `drizzle.config.ts` also loads `.env.local`, then `.env`, via dotenv. `.gitignore` ignores `.env*` except `.env.example`.
- **Next 16 conventions:** middleware is now `proxy.ts`. Check `node_modules/next/dist/docs/` before using APIs that may have changed.
- **Design system:** everything lives in `src/app/globals.css`: `@theme` tokens plus `@utility` classes (no `tailwind.config`, no component CSS files). It is light-only, monochrome and square-cornered (`--radius-*: initial` removes `rounded-sm`…`3xl`). Use the semantic tokens (`text-ink`/`text-muted`, `bg-surface`, `border-line`, `text-display|title|heading|body|ui|label`, `px-gutter`, `py-section`, `gap-stack`, `aspect-product`) and primitives (`container-page|content|narrow`, `section`, `full-bleed`, `grid-products`, `grid-editorial`, `media-stage`, `scroller-x`, `btn btn-primary|secondary|inverse|ghost`, `link`, `link-reveal`, `link-cta`, `label`) instead of raw Tailwind palette colours or arbitrary values.
- **Spacing token names:** don't name a `--spacing-*` token after a CSS keyword. Tailwind v4 also generates functional utilities from it, so `--spacing-block` made `inline-block` set `inline-size` as well. That is why the in-section rhythm token is called `stack`.
- **Storefront UI:** `src/components/layout` holds the site header, the mobile menu (native `<dialog>`) and the footer, mounted once in `src/app/layout.tsx`, which also owns `<main id="main">` and the skip link. Homepage sections are in `src/components/home`, in page order, and product cards in `src/components/product`. Client components are kept to leaves (menu, wishlist toggle, newsletter form).
- **Sample content:** `src/lib/catalog.ts` holds typed sample products, collections and nav, with Unsplash images allowed through `images.remotePatterns` in `next.config.ts`. Replace it with database queries once the catalogue schema exists. Next 16 deprecated `priority` on `next/image`; above-the-fold images use `loading="eager"` with `fetchPriority="high"`.

