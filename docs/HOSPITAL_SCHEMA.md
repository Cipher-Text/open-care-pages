# Hospital Content Schema

This reference lists all supported frontmatter fields for hospital pages and how they render in the landing page.

## Required

```yaml
title: Harborview Medical Center
type: hospital
location: 325 9th Ave, Seattle, WA 98104
```

## Optional (commonly used)

```yaml
tagline: Level I trauma care and comprehensive specialty services for the region.
contact: "(206) 555-0123 / care@opencare.com"
phone: "(206) 555-0123"
email: "care@opencare.com"
appointmentPhone: "(206) 555-0199"
emergencyPhone: "911 or (206) 555-0000"
visitingHours: Monday-Sunday, 8:00 AM-8:00 PM
bookingUrl: https://example.com/booking
mapUrl: https://maps.google.com/?q=Harborview+Medical+Center+Seattle
services:
  - Emergency care
  - Cardiology
  - Orthopedics
departments:
  - name: Emergency and trauma
    summary: Level I trauma center with rapid response teams and critical care.
  - name: Heart and vascular
    summary: Interventional cardiology, cardiac surgery, and rehab services.
facilities:
  - 24/7 emergency department
  - Intensive care and step-down units
diagnostics:
  - MRI and CT imaging
  - Digital X-ray
insurance:
  - Most major commercial plans
  - Medicare and Medicaid
accreditations:
  - Joint Commission accredited
  - Level I trauma designation
stats:
  - label: Emergency response
    value: 24/7
  - label: Annual visits
    value: 320k
featuredDoctors:
  - name: Dr. Avery Morgan
    specialty: Internal Medicine
    credentials: MD, Board Certified
    profileUrl: /d/dr-silver
  - name: Dr. Jordan Lee
    specialty: General Surgery
    credentials: MS, Fellowship Trained
    profileUrl: /d/dr-gold
  - name: Dr. Casey Rivera
    specialty: Pediatrics
    credentials: MD, Pediatric Specialist
    profileUrl: /d/dr-arif-rahman
show:
  hero: true
  emergency: true
  overview: true
  departments: true
  facilities: true
  diagnostics: true
  insurance: true
  accreditations: true
  doctors: true
  contact: true
  map: true
  cta: true
  footer: true
socialLinks:
  - label: Facebook
    url: https://facebook.com
seo:
  title: Harborview Medical Center - Seattle Hospital
  description: Full-service hospital with 24/7 emergency care in Seattle.
```

## Body content (Markdown)

Hospital pages render Markdown content below the hero. Use headings and lists to keep information scannable.

```md
## Overview
Short summary of the hospital.

## Patient services
- 24/7 emergency department
- Imaging and lab services
- Specialty clinics and referrals

## Visiting hours
Monday-Sunday, 8:00 AM-8:00 PM. Please call ahead for unit-specific guidance.
```

## Notes

- All hospital files live in `src/content/hospitals/`.
- The filename slug determines the URL: `src/content/hospitals/harborview-medical.md` -> `/h/harborview-medical`.
- `services` is a simple string list for quick display in the hero and summary sections.
- `departments` powers the department cards. If omitted, `services` will be used instead.
- `featuredDoctors` powers the doctor profiles section.
- Use `show` to turn sections on/off. Any key set to `false` hides the section.
- `contact` is optional but recommended for discoverability.
- SEO fields are optional and override default page metadata when provided.
