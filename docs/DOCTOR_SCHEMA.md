# Doctor Content Schema

This reference lists all supported frontmatter fields for doctor pages and how they render in the landing page.

## Required

```yaml
title: Dr. Maya Patel
type: doctor
location: Austin, TX
contact: "(512) 555-0142 · hello@opencare.com"
```

## Optional (commonly used)

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
appointmentHours: "Mon–Sat, 9:00 AM–5:00 PM"
emergencyNote: "For emergencies, call 911."
```

### Headshot image guidance

- Store files in `public/images/doctors/`
- Recommended size: 800x800 px (square)
- Minimum size: 400x400 px
- Formats: JPG, PNG, or SVG
- Reference in frontmatter as `/images/doctors/filename.ext`

## Trust strip

```yaml
trust:
  boardCertified: true
  hospitalPrivileges: true
  cme: true
  languages:
    - English
    - Spanish
```

## About section

```yaml
carePhilosophy:
  - Evidence-based care with clear next steps
  - Shared decision making and patient education
  - Long-term relationship focus
```

## Services & conditions

```yaml
focusAreas:
  - Annual physicals
  - Diabetes care
  - Hypertension management
consultationModes:
  - In-person
  - Online
```

## Expertise & credentials

```yaml
degrees:
  - title: MD
    institution: University of Texas
    year: 2012
  - title: Residency, Internal Medicine
    institution: Dell Medical School
    year: 2015
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
```

## Locations & schedule

```yaml
locations:
  - name: Downtown Clinic
    address: "123 Main St, Austin, TX"
    schedule:
      - day: Monday
        time: "9:00 AM - 5:00 PM"
      - day: Wednesday
        time: "9:00 AM - 1:00 PM"
    feeRange: "$80–$120"
    remarks: "Serial required"
    phone: "(512) 555-0142"
    email: "hello@opencare.com"
    whatsapp: "+15125550142"
    bookingUrl: "https://example.com/booking"
    mapUrl: "https://maps.google.com/?q=Downtown+Clinic"
    mapEmbed: "https://www.google.com/maps/embed?..."
```

## Reviews

```yaml
reviewLinks:
  - label: "Google Reviews"
    url: "https://google.com"
  - label: "Healthgrades"
    url: "https://healthgrades.com"
```

## FAQs

```yaml
faqs:
  - question: "Do you accept insurance?"
    answer: "Yes, most major plans."
    category: "Billing"
  - question: "What should I bring to my first visit?"
    answer: "Please bring your ID and insurance card."
```

## Social links

```yaml
socialLinks:
  - label: "LinkedIn"
    url: "https://linkedin.com"
  - label: "Facebook"
    url: "https://facebook.com"
```

## Notes

- Sections only render when data exists (except hero, about, contact, footer).
- WhatsApp supports either a full URL or a raw phone number.
- The filename slug determines the URL: `src/content/doctors/dr-maya-patel.md` → `/d/dr-maya-patel`.
