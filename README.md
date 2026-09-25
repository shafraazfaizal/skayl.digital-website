# skayl.digital-website

The website for **SKAYL**, a creative studio across the UK and Sri Lanka. Live at [skayl.digital](https://skayl.digital).

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, GSAP and Lenis.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

| Script          | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the local dev server       |
| `npm run build` | Create a production build        |
| `npm run start` | Serve the production build       |

## Project structure

```
skayl.digital-website/
├── docs/
│   └── website-content.md        # Full copy inventory, page by page
├── public/                       # Static files, served from the site root
│   ├── brand/                    # Wordmark / logo files
│   ├── images/
│   │   ├── services/             # One image per service
│   │   └── work-cards/           # Card backgrounds, named by project slug
│   └── work/                     # Project media, one folder per project slug
│       ├── autovive/
│       ├── framed-splendor/
│       ├── jma-uk/
│       ├── shajara-tea/
│       └── zero-excuses/
├── src/
│   ├── app/                      # Routes (Next.js App Router)
│   │   ├── layout.tsx            # Root layout: fonts, navbar, footer, cursor, smooth scroll
│   │   ├── page.tsx              # Home
│   │   ├── about/  blog/  contact/  services/  works/
│   │   ├── privacy-policy/  terms-and-conditions/
│   │   └── api/contact/route.ts  # Contact form endpoint (Resend)
│   ├── components/
│   │   ├── layout/               # Navbar, Footer, Cursor, SmoothScroll
│   │   ├── sections/             # Page sections, grouped by the page that uses them
│   │   │   ├── home/  about/  services/  works/  contact/
│   │   │   └── shared/           # Used on several pages (CTA, PageHero, LegalPage)
│   │   └── ui/                   # Small reusable building blocks
│   ├── content/                  # All site copy and data — edit text here
│   ├── hooks/                    # Custom React hooks
│   └── lib/                      # Utilities
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

**Where to edit things**

- **Copy and data** (services, projects, FAQs, testimonials, blog posts, founders) live in `src/content/`. Each file covers one area.
- **A page's layout** is in `src/app/<page>/page.tsx`, which assembles sections from `src/components/sections/`.
- **Project media** goes in `public/work/<project-slug>/`, where the folder name matches the URL (`/works/<project-slug>`).
- **The `@/` import alias** points to `src/`.

## Environment variables

See `.env.example`. Set the same keys in Vercel under **Project → Settings → Environment Variables**.

| Key                | Purpose                                     |
| ------------------ | ------------------------------------------- |
| `RESEND_API_KEY`   | Sends contact-form enquiries via Resend     |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries               |

## Deployment

The site is hosted on Vercel, and every push to `main` deploys to production. The domain `skayl.digital` is configured in Vercel under **Project → Settings → Domains**.
