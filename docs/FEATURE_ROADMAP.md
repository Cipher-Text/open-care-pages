# Astro Features – Roadmap & Priority (Open Care)

This document lists **future features that can be implemented using Astro only**.
Priority is based on:

- Sales value
- Doctor adoption
- Low technical complexity
- No backend dependency

---

## ✅ Implemented (Astro-only)

- QR Code Generation (see `docs/FEATURES_IMPLEMENTED.md`)
- Digital Visiting Card (vCard) (see `docs/FEATURES_IMPLEMENTED.md`)

---

## 🔥 Priority 1 – Immediate (High ROI, Low Effort)

### 1. WhatsApp Pre-filled Message

**Purpose**

- Reduces friction for patients
- Standardizes appointment requests

Example message:

> Hello Doctor, I found your profile on Open Care and would like to book an appointment.

**Astro scope**

- URL generation only

---

## ⭐ Priority 2 – Sales Booster Features

### 2. Printable Visiting Card (PDF)

**Purpose**

- Doctor-branded visiting card
- Downloadable / printable

**Astro scope**

- HTML → PDF (client-side)
- Print-optimized layout

**Tier**

- Diamond plan feature

---

### 3. Shareable Profile Poster

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

### 4. Feature Tier Gating

**Purpose**

- Monetization control (Free / Silver / Gold / Diamond)

**Astro scope**

- Frontmatter flags
- Conditional rendering only

No backend required.

---

## 🚀 Priority 3 – Trust & Growth Enhancements

### 5. Doctor JSON-LD (Structured Data)

**Purpose**

- Google rich results
- Higher SEO trust

**Astro scope**

- Static JSON-LD injection

---

### 6. “Download Profile” PDF (One-pager)

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

### 7. Google Maps Direction Button

**Purpose**

- One-tap navigation
- Higher patient confidence

**Astro scope**

- Static Google Maps deep link

---

## 🧠 Priority 4 – Nice-to-have (Still Astro-only)

### 8. Language Toggle (EN / BN)

- Static bilingual pages
- SEO-friendly

### 9. Accessibility Improvements

- Font scaling
- Contrast modes

### 10. Analytics Hooks (Later)

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
