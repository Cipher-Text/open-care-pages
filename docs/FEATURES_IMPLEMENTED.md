# Astro Features – Implemented (Open Care Doctor Pages)

This document lists all features currently implemented using **Astro only**.
Scope is limited to static / client-side capabilities.  
No backend, no Strapi dependency.

---

## 1. Static Doctor Profile Pages ✅

- Each doctor has a dedicated page generated from Markdown frontmatter
- URL structure supports clean SEO-friendly routes
- Pages are fully static (SSG) and fast

**Data source**

- `src/content/doctors/*.md`

---

## 2. Structured Doctor Content Model ✅

Implemented via `astro:content` collections with Zod validation.

### Supported fields

- Personal info (name, specialty, BMDC number)
- Location (Bangladesh-focused)
- Contact info (phone, email, WhatsApp)
- Degrees & training
- Affiliations (works at / visits at)
- Practice locations & schedules
- FAQs
- Reviews & social links

Schema supports:

- Empty strings (`''`) for incomplete real-world data
- Optional fields without breaking builds

---

## 3. Trust & Verification System ✅

Displayed as visual trust chips.

Supported trust signals:

- Verified doctor
- BMDC registered
- BCS (Health Cadre)
- Postgraduate training
- Board certified (optional)
- Hospital privileges (optional)
- Languages spoken

Bangladesh-first trust design.

---

## 4. Responsive Doctor Landing Layout ✅

- Mobile-first
- Sticky header with CTA
- Bottom sticky CTA on mobile
- Clean medical UI (no ads / clutter)

Sections:

- Hero
- About
- Care philosophy
- Services & conditions
- Expertise & credentials
- Practice locations & schedule
- Reviews
- FAQ
- Contact & booking

---

## 5. Smart Booking CTA Logic ✅

Primary CTA behavior:

- WhatsApp if a number/link is available
- Otherwise `bookingUrl` (if provided)
- Otherwise contact section fallback

Additional CTAs expose call, email, and booking as available.

---

## 6. WhatsApp Pre-filled Message ✅

- WhatsApp links include a prefilled appointment request message
- Supports raw numbers or full WhatsApp URLs
- If a provided WhatsApp URL already includes a `text` query param, it is preserved

---

## 7. Language Toggle (EN / BN) ✅

- Optional EN/BN toggle for doctor pages
- Controlled via `show.languageToggle`
- Localized copy can be provided in frontmatter via `localization.locales.bn`
- Uses English as fallback when Bengali text is missing

---

## 8. QR Code Generation ✅

- Renders a profile QR code (booking URL fallback to page URL)
- Downloadable PNG from the UI
- Controlled via frontmatter `show.qr`

**Implementation**

- UI: `src/components/QRCode.astro`
- Render hook: `src/layouts/DoctorLayout.astro`

---

## 9. Digital Visiting Card (vCard) ✅

- Generates a downloadable `.vcf` contact card
- Pulls from doctor frontmatter (name, phone, email, location, booking URL)
- Controlled via frontmatter `show.vcard`

**Implementation**

- Render hook: `src/layouts/DoctorLayout.astro`

---

## 10. Practice Locations & Schedule Rendering ✅

- Multiple locations supported
- Day-wise schedule display
- Fee range support
- Google Maps link / embed (optional)

Graceful fallback when schedules are not yet available.

---

## 11. SEO Basics Implemented ✅

- Page-level SEO title & description
- Clean semantic HTML
- Proper heading hierarchy
- Fast Lighthouse scores due to Astro SSG

---

## 12. Safe Handling of Incomplete Data ✅

Real-world BD data often lacks:

- Phone numbers
- Schedules
- Emails

System:

- Never breaks build
- Never renders empty UI blocks
- Displays “Schedule will be updated soon” where needed

---

## 13. Ready for Scale ✅

Designed to support:

- 1,000+ doctor pages
- Minimal server cost
- Git-based content workflow
- Future CMS (Strapi) replacement without redesign

---

## Summary

Current Astro implementation already supports:

- Professional doctor portfolios
- Trust-first medical presentation
- Sales-ready landing pages
- Bangladesh medical ecosystem realities

No backend required.
