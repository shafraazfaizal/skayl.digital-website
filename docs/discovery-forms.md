# Discovery forms

Private, one-per-client forms SKAYL sends before quoting. They replace the emailed PDF form.

## How it works

- **Admin:** sign in at `/auth/sign-in` (magic link, only emails in `ADMIN_EMAILS`), then go to `/admin/discovery`.
  Create a link, pick the sections, copy the link or the WhatsApp message. The full link is shown once.
- **Client:** opens `/discovery/<token>`, answers (autosaves), reviews, submits. The link then locks.
- **On submit:** a PDF is generated and stored in the private `discovery-pdfs` bucket. The client gets a copy by
  email, and SKAYL gets it too, with a link to the submission in the admin.
- **Admin actions:** Download PDF, Reopen (unlock with a new expiry), Revoke, Duplicate (same settings, new client),
  New link (replaces a lost link; the old one stops working).

## Where things live

| What | Where |
| --- | --- |
| Questions, sections, intros, presets | `src/lib/discovery/questions.ts` |
| Per-link logic, validation (Zod) | `src/lib/discovery/form.ts` |
| Client form UI and diagrams | `src/components/discovery/` |
| Admin pages | `src/app/admin/discovery/` |
| PDF | `src/lib/discovery/pdf/DiscoveryPdf.tsx` |
| Emails | `src/emails/DiscoveryEmails.tsx` |
| Database setup | `supabase/discovery.sql` |

To add a section: add it to `SECTIONS`, `SELECTABLE_SECTIONS` and its questions to `QUESTIONS`.
Everything else (form, validation, admin, PDF, emails) follows.

## Privacy

- Only a SHA-256 hash of each token is stored. Tokens are 32 random bytes.
- `/discovery`, `/admin` and `/auth` are `noindex`, send `X-Robots-Tag`, `Cache-Control: no-store` and
  `Referrer-Policy: no-referrer`, are disallowed in `robots.txt` and are not in the sitemap.
- All tables have row-level security on with no public policies. Only server code (service role key) reads them.
- Lookups, saves, submits and sign-ins are rate-limited per visitor (hashed IP).

## Environment variables

| Key | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon / publishable key (admin sign-in) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role / secret key (server only) |
| `ADMIN_EMAILS` | Comma-separated emails allowed into the admin |
| `NEXT_PUBLIC_SITE_URL` | `https://www.skayl.digital` (used in links and emails) |
| `RESEND_API_KEY` | Already set for the contact form |
| `CONTACT_TO_EMAIL` | Optional. Where submissions go (defaults to hello@skayl.digital) |
