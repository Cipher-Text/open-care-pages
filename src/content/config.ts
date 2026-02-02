import { defineCollection, z } from 'astro:content';

const empty = z.literal('');
const optionalString = z.union([z.string(), empty]).optional();
const optionalUrl = z.union([z.string().url(), empty]).optional();
const optionalBool = z.union([z.boolean(), empty]).optional();

const baseSchema = z.object({
  title: z.string(),
  type: z.enum(['doctor', 'hospital', 'institute']),
  specialty: optionalString,
  services: z.array(z.string()).optional(),
  location: z.string(),
  contact: optionalString,
  seo: z
    .object({
      title: optionalString,
      description: optionalString
    })
    .optional()
});

const doctors = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    type: z.literal('doctor'),
    phone: optionalString,
    bmdcNumber: optionalString,
    email: optionalString,
    whatsapp: optionalString,
    bookingUrl: optionalUrl,
    headshot: optionalString,
    verified: optionalBool,
    licenseStatus: optionalString,
    valueProp: optionalString,
    trust: z
      .object({
        boardCertified: optionalBool,
        hospitalPrivileges: optionalBool,
        cme: optionalBool,
        bmdcRegistered: optionalBool,
        governmentCadre: optionalBool,
        postgraduateTraining: optionalBool,
        languages: z.array(z.string()).optional()
      })
      .optional(),
    show: z
      .object({
        trust: optionalBool,
        carePhilosophy: optionalBool,
        services: optionalBool,
        expertise: optionalBool,
        locations: optionalBool,
        reviews: optionalBool,
        faqs: optionalBool,
        qr: optionalBool,
        vcard: optionalBool,
        quickBooking: optionalBool,
        socialLinks: optionalBool
      })
      .optional(),
    carePhilosophy: z.array(z.string()).optional(),
    focusAreas: z.array(z.string()).optional(),
    consultationModes: z.array(z.string()).optional(),
    degrees: z
      .array(
        z.object({
          title: z.string(),
          institution: optionalString,
          year: optionalString
        })
      )
      .optional(),
    affiliations: z
      .object({
        worksAt: z.array(z.string()).optional(),
        visitsAt: z.array(z.string()).optional(),
        roles: z.array(z.string()).optional()
      })
      .optional(),
    publications: z.array(z.string()).optional(),
    awards: z.array(z.string()).optional(),
    media: z.array(z.string()).optional(),
    locations: z
      .array(
        z.object({
          name: z.string(),
          address: z.string(),
          schedule: z
            .array(
              z.object({
                day: z.string(),
                time: z.string()
              })
            )
            .optional(),
          feeRange: optionalString,
          remarks: optionalString,
          phone: optionalString,
          email: optionalString,
          whatsapp: optionalString,
          bookingUrl: optionalUrl,
          mapUrl: optionalUrl,
          mapEmbed: optionalString
        })
      )
      .optional(),
    reviewLinks: z
      .array(
        z.object({
          label: z.string(),
          url: z.union([z.string().url(), empty])
        })
      )
      .optional(),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
          category: optionalString
        })
      )
      .optional(),
    appointmentHours: optionalString,
    emergencyNote: optionalString,
    socialLinks: z
      .array(
        z.object({
          label: z.string(),
          url: z.union([z.string().url(), empty])
        })
      )
      .optional()
  })
});

const hospitals = defineCollection({
  type: 'content',
  schema: baseSchema.extend({ type: z.literal('hospital') })
});

const institutes = defineCollection({
  type: 'content',
  schema: baseSchema.extend({ type: z.literal('institute') })
});

export const collections = { doctors, hospitals, institutes };
