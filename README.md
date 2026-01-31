# Open Care Pages

Minimal, disposable Astro site for publishing doctor, hospital, and institute landing pages for Open Care. Content lives in Markdown so non-technical edits feel like editing a README. Git push = publish.

## Purpose
- Temporary static site for landing pages
- Mirrors the upcoming Strapi content model
- No CMS, database, auth, dashboards, or admin UI

## Getting started
```bash
npm install
npm run dev
```

## Add a new page
1. Create a Markdown file in the right folder:
   - `src/content/doctors/` → `/d/{slug}`
   - `src/content/hospitals/` → `/h/{slug}`
   - `src/content/institutes/` → `/i/{slug}`
2. Use the frontmatter fields below and write the body in Markdown.
3. Commit and push.

### Frontmatter format
```yaml
title: Example Name
slug: example-slug
type: doctor | hospital | institute
specialty: Optional specialty (doctor only)
services: [Optional list of services]
location: City, ST
contact: "Phone · email@opencare.com"
seo:
  title: Optional SEO title
  description: Optional SEO description
```

## How this will be replaced by Strapi
- These Markdown files map 1:1 to the Strapi content types (`doctor`, `hospital`, `institute`).
- When Strapi is ready, the dynamic pages will be replaced by API-driven templates.
- This repo is meant to be deleted once `open-care-landing` is live.

## Notes
- Keep content simple and readable.
- Avoid new abstractions; this project is intentionally temporary.
