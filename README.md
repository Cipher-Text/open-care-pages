# Open Care Pages

Minimal, disposable Astro site for publishing doctor, hospital, and institute landing pages for Open Care. Content lives in Markdown so non-technical edits feel like editing a README. Git push = publish.

## Purpose
- Temporary static site for landing pages
- Mirrors the upcoming Strapi content model
- No CMS, database, auth, dashboards, or admin UI

## Getting started
```bash
npm install
npm run dev      # local dev server
npm run build    # static build
npm run preview  # preview the build
npm run check    # astro check (types + content schema)
```

Built with Astro 5, Tailwind 3 and `qrcode` (for the QR/vCard blocks). Also serves `/` (index), `/hospital` and `/pricing` pages. More detail lives in `docs/` (content guide, doctor and hospital schemas, deployment, roadmap).

## Add a new page
1. Create a Markdown file in the right folder:
   - `src/content/doctors/` → `/d/{slug}`
   - `src/content/hospitals/` → `/h/{slug}`
   - `src/content/institutes/` → `/i/{slug}`
2. Use the frontmatter fields below and write the body in Markdown. The URL slug comes from the file name (there is no `slug` field in the schema).
3. Commit and push.

### Frontmatter format
The schema is defined in `src/content/config.ts` and is validated at build time; the doctor, hospital and institute collections each add their own fields (e.g. `bmdcNumber`, `bookingUrl`, `verified`, `trust` for doctors). See `docs/DOCTOR_SCHEMA.md` and `docs/HOSPITAL_SCHEMA.md` for the full lists. Common fields:
```yaml
title: Example Name
type: doctor | hospital | institute
specialty: Optional specialty (doctor only)
services: [Optional list of services]
location: City, ST
contact: "Phone · email@opencare.com"
seo:
  title: Optional SEO title
  description: Optional SEO description
show:
  trust: true
  carePhilosophy: true
  services: true
  expertise: true
  locations: true
  reviews: true
  faqs: true
  qr: true
  vcard: true
  quickBooking: true
  socialLinks: true
```

## How this will be replaced by Strapi
- These Markdown files map 1:1 to the Strapi content types (`doctor`, `hospital`, `institute`).
- When Strapi is ready, the dynamic pages will be replaced by API-driven templates.
- This repo is meant to be deleted once `open-care-landing` is live.

## Notes
- Keep content simple and readable.
- Avoid new abstractions; this project is intentionally temporary.
