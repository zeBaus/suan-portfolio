# suan-portfolio

Personal portfolio built with **Next.js (App Router) + TypeScript + Tailwind**, with **MDX-driven case studies** via Contentlayer.

This repo is optimized for:
- clean, fast, SEO-friendly pages
- MDX-authored case studies under `/work`
- a small “design system” foundation (shadcn-style primitives like `Card`, `Badge`, `Button`)

---

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**
- **Contentlayer** (MDX content → typed `contentlayer/generated`)
- UI primitives (shadcn-style):
  - `src/components/ui/card.tsx`
  - `src/components/ui/badge.tsx`
  - `src/components/ui/button.tsx`

---

## Requirements

- Node.js 18+ (recommended)
- npm

---

## Local Development

### 1) Install dependencies

```bash
npm install
```

### 2) Run the dev server

```bash
npm run dev
```

Open:
- Home: http://localhost:3000
- Work index: http://localhost:3000/work
- Contact: http://localhost:3000/contact

> If you edit MDX files or `contentlayer.config.ts`, restart the dev server to ensure Contentlayer regenerates.

---

## Production Build (Local)

```bash
npm run build
npm start
```

---

## Environment Variables

Copy the example env file:

**Windows PowerShell**
```powershell
copy .env.example .env.local
```

**macOS / Linux**
```bash
cp .env.example .env.local
```

### Required

- `NEXT_PUBLIC_SITE_URL`  
  Used by SEO helpers + sitemap/robots. Example:

```env
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

### Optional: Analytics

This project is ready for Plausible or Umami (depending on your setup).

**Plausible**
```env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.tld
```

**Umami**
```env
NEXT_PUBLIC_UMAMI_WEBSITE_ID=00000000-0000-0000-0000-000000000000
NEXT_PUBLIC_UMAMI_SRC=https://analytics.example.com/script.js
```

---

## Content (MDX Case Studies)

MDX lives here:

```
content/work/*.mdx
```

Routing:
- `/work` lists all case studies
- `/work/[slug]` renders the MDX detail page

Frontmatter fields you may use:
- `title` (string)
- `date` (string, ISO recommended)
- `summary` (string)
- `tags` (string[])
- `featured` (boolean)
- `order` (string or number; resilient to CRLF on Windows)

---

## Project Structure (High Level)

```
src/
  app/
    page.tsx
    layout.tsx
    contact/page.tsx
    not-found.tsx
    sitemap.ts
    robots.txt
    opengraph-image.tsx
    icon.tsx
    (work)/
      work/
        page.tsx
        [slug]/page.tsx
  components/
    header.tsx
    footer.tsx
    ui/
      badge.tsx
      button.tsx
      card.tsx
  lib/
    seo.ts
    utils.ts
content/
  work/
    *.mdx
```

---

## Deployment (Vercel)

1) Push your repo to GitHub.
2) Import the repo in Vercel.
3) Set env vars in Vercel → Project Settings → Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` (recommended)
   - analytics vars (optional)
4) Deploy.

Build command:
```bash
npm run build
```

---

## Notes (Windows + Contentlayer)

You may see warnings like “Contentlayer might not work as expected on Windows.”  
The project is configured to be resilient and should still build successfully.

If Contentlayer says it skipped a document due to a frontmatter mismatch:
- check the MDX frontmatter types (especially `order`)
- ensure the file is saved cleanly (CRLF can show up as `\r` in some editors)

---

## Commands Summary

```bash
npm install
npm run dev
npm run build
npm start
```
