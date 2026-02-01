# Astro Features – Roadmap & Priority (Open Care)

This document lists **future features that can be implemented using Astro only**.
Priority is based on:

- Sales value
- Doctor adoption
- Low technical complexity
- No backend dependency

---

## 🔥 Priority 1 – Immediate (High ROI, Low Effort)

### 1. QR Code Generation

**Purpose**

- Link to doctor profile / WhatsApp / Google Maps
- Used on visiting cards, chambers, Facebook posts

**Astro scope**

- Client-side JS only
- Downloadable PNG/SVG

**Why priority**

- Extremely sellable
- Very popular in Bangladesh medical practices

---

### 2. Digital Visiting Card (vCard `.vcf`)

**Purpose**

- One-click “Save Doctor Contact”
- Works on Android & iOS

**Astro scope**

- Static `.vcf` file generation
- Download button

**Sales value**

- Premium professional feature
- Easy upsell

---

### 3. WhatsApp Pre-filled Message

**Purpose**

- Reduces friction for patients
- Standardizes appointment requests

Example message:

> Hello Doctor, I found your profile on Open Care and would like to book an appointment.

**Astro scope**

- URL generation only

---

## ⭐ Priority 2 – Sales Booster Features

### 4. Printable Visiting Card (PDF)

**Purpose**

- Doctor-branded visiting card
- Downloadable / printable

**Astro scope**

- HTML → PDF (client-side)
- Print-optimized layout

**Tier**

- Diamond plan feature

---

### 5. Shareable Profile Poster

**Purpose**

- Doctor shares poster on Facebook / WhatsApp
- Organic growth for Open Care

Includes:

- Doctor name & specialty
- QR code
- Profile URL

**Astro scope**

- Canvas or HTML-to-image

---

### 6. Feature Tier Gating

**Purpose**

- Monetization control (Free / Silver / Gold / Diamond)

**Astro scope**

- Frontmatter flags
- Conditional rendering only

No backend required.

---

## 🚀 Priority 3 – Trust & Growth Enhancements

### 7. Doctor JSON-LD (Structured Data)

**Purpose**

- Google rich results
- Higher SEO trust

**Astro scope**

- Static JSON-LD injection

---

### 8. “Download Profile” PDF (One-pager)

**Purpose**

- Hospital HR
- Conference use
- Media sharing

Includes:

- Bio
- Degrees
- Chamber info
- QR code

---

### 9. Google Maps Direction Button

**Purpose**

- One-tap navigation
- Higher patient confidence

**Astro scope**

- Static Google Maps deep link

---

## 🧠 Priority 4 – Nice-to-have (Still Astro-only)

### 10. Language Toggle (EN / BN)

- Static bilingual pages
- SEO-friendly

### 11. Accessibility Improvements

- Font scaling
- Contrast modes

### 12. Analytics Hooks (Later)

- Click tracking hooks (CTA only)
- Can be wired to GA / Plausible later

---

## What is Explicitly Out of Scope (for Astro)

- Appointment booking backend
- Payments
- Doctor authentication
- Reviews submission
- Admin dashboards

These will be handled later by Strapi / backend services.

---

## Strategic Note

Astro is being used intentionally as:

- A **high-performance landing engine**
- A **sales & trust builder**
- A **low-cost scale solution**

All future CMS/backend systems should **replace data source**, not UI or UX.

---

End of roadmap.
