# Teach Truth

Classroom-led public education reform site for **Ruth Lerno** and *Teacher Truth with Ruth*.

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Education reform plan (5 pillars) |
| `/reality` | Classroom reality dossier (teachers + children) |
| `/ruth` | Meet the visionary |
| `/join` | Take the Wheel action pledge |

## SEO / AEO / GEO

- Metadata + Open Graph in `src/app/layout.tsx`
- JSON-LD `@graph` in `src/lib/seo/schema.ts`
- `sitemap.xml`, `robots.ts` (AI crawlers allowed)
- `public/llms.txt`

## Action form

Pledges post through `src/app/actions/pledge.ts`. Set `ACTION_WEBHOOK_URL` to forward submissions to Zapier, Make, Formspree, or a custom inbox webhook. Without it, pledges log server-side in development.

## Content

Pillars and FAQs live in `src/lib/content.ts`. Site constants in `src/lib/site.ts`.

Set `NEXT_PUBLIC_SITE_URL` in production for absolute canonicals and schema URLs.
