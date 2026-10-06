# Atelier Store

Next.js (App Router) + TypeScript + Tailwind CSS, with Better Auth, Drizzle ORM and Postgres on Neon.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL and BETTER_AUTH_SECRET
npm run auth:generate        # writes Better Auth tables to src/db/schema.ts
npm run db:push              # or: npm run db:generate && npm run db:migrate
npm run dev
```

## Structure

```
src/
  app/api/auth/[...all]/route.ts  Better Auth route handler
  db/index.ts                     Drizzle client (Neon HTTP driver)
  db/schema.ts                    Drizzle schema
  lib/auth.ts                     Better Auth server config
  lib/auth-client.ts              Better Auth React client
drizzle.config.ts                 drizzle-kit config
```

## Scripts

| Script | Purpose |
| --- | --- |
| `dev` / `build` / `start` | Next.js |
| `lint` / `typecheck` | ESLint / `tsc --noEmit` |
| `auth:generate` | Generate Better Auth Drizzle schema |
| `db:generate` / `db:migrate` | Create / apply SQL migrations |
| `db:push` | Push schema directly (dev) |
| `db:studio` | Drizzle Studio |
