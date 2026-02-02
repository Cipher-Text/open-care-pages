# Content Guide

This guide explains how to create and maintain provider pages using Markdown content.

## File locations

Place content files in the appropriate folder:

- Doctors: `src/content/doctors`
- Hospitals: `src/content/hospitals`
- Institutes: `src/content/institutes`

## Frontmatter reference

Required fields:

```yaml
title: Dr. Maya Patel
type: doctor
location: Austin, TX
contact: "(512) 555-0142 · hello@opencare.com"
```

Optional fields (doctor pages):

```yaml
specialty: Internal Medicine
phone: "(512) 555-0142"
email: "hello@opencare.com"
whatsapp: "+15125550142"
bookingUrl: "https://example.com/booking"
headshot: "/images/doctors/maya.jpg"
verified: true
licenseStatus: "Active"
valueProp: "Same-week appointments for preventive care."
trust:
  boardCertified: true
  hospitalPrivileges: true
  cme: true
  languages:
    - English
    - Spanish
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
carePhilosophy:
  - Evidence-based care with clear next steps
  - Shared decision making and patient education
  - Long-term relationship focus
focusAreas:
  - Annual physicals
  - Diabetes care
consultationModes:
  - In-person
  - Online
degrees:
  - title: MD
    institution: University of Texas
    year: 2012
affiliations:
  worksAt:
    - Austin Health Partners
  visitsAt:
    - Central Hospital
  roles:
    - Clinical Instructor, UT
publications:
  - Journal article title
awards:
  - Local medical award
media:
  - Interview on local news
locations:
  - name: Downtown Clinic
    address: "123 Main St, Austin, TX"
    schedule:
      - day: Monday
        time: "9:00 AM - 5:00 PM"
    feeRange: "$80–$120"
    remarks: "Serial required"
    phone: "(512) 555-0142"
    email: "hello@opencare.com"
    whatsapp: "+15125550142"
    bookingUrl: "https://example.com/booking"
    mapUrl: "https://maps.google.com/?q=Downtown+Clinic"
    mapEmbed: "https://www.google.com/maps/embed?..."
reviewLinks:
  - label: "Google Reviews"
    url: "https://google.com"
faqs:
  - question: "Do you accept insurance?"
    answer: "Yes, most major plans."
    category: "Billing"
appointmentHours: "Mon–Sat, 9:00 AM–5:00 PM"
emergencyNote: "For emergencies, call 911."
socialLinks:
  - label: "LinkedIn"
    url: "https://linkedin.com"
seo:
  title: Custom SEO title
  description: Custom SEO description
```

### Section toggles

Use `show` to turn sections on/off. Any key set to `false` hides the section.

```yaml
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

QR codes are already implemented. Keep `show.qr: true` to render the QR card, and it will link to `bookingUrl` if provided (otherwise it falls back to the page URL).
vCards are also implemented. Keep `show.vcard: true` to enable a downloadable `.vcf` contact file. The vCard pulls from `title`, `specialty`, `phone`, `email`, `bookingUrl` (or page URL), `location`, `bmdcNumber`, and the first `affiliations.worksAt` entry.

### Headshot image guidance

- Store files in `public/images/doctors/`
- Recommended size: 800x800 px (square)
- Minimum size: 400x400 px
- Formats: JPG, PNG, or SVG
- Reference in frontmatter as `/images/doctors/filename.ext`

Optional fields (hospital/institute pages):

```yaml
services:
  - Emergency care
  - Cardiology
```

## Writing content

Use Markdown headings and lists to structure information:

```md
## Overview
Short summary of the provider.

## Services
- Service one
- Service two

## Scheduling
How to book or contact.
```

## Tips

- Keep contact info up to date.
- Use clear, scannable headings.
- Avoid sensitive personal details in content.
- Sections only render if you provide data (except hero, about, contact, footer).
