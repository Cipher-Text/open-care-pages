# Architecture

## Overview

Open Care Pages is an Astro project that renders static landing pages for doctors, hospitals, and institutes using Markdown content.

## Content flow

1) Add a Markdown file in `src/content`.
2) Astro content collections validate frontmatter with `src/content/config.ts`.
3) Dynamic routes in `src/pages` render each entry using a layout.

## Project structure

```text
src/
  content/
    doctors/
    hospitals/
    institutes/
    config.ts
  layouts/
    BaseLayout.astro
    DoctorLayout.astro
    HospitalLayout.astro
    InstituteLayout.astro
  pages/
    d/[slug].astro
    h/[slug].astro
    i/[slug].astro
    index.astro
  styles/
    global.css
public/
  images/
    doctors/
```

## Routes

- Doctors: `/d/[slug]`
- Hospitals: `/h/[slug]`
- Institutes: `/i/[slug]`

Slugs are derived from the Markdown filenames.

## Rendering rules

- The doctor template renders sections only when related data exists (except hero, about, contact, footer).
- Hospital and institute templates render the Markdown body as their overview content.
