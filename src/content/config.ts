import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  type: z.enum(['doctor', 'hospital', 'institute']),
  specialty: z.string().optional(),
  services: z.array(z.string()).optional(),
  location: z.string(),
  contact: z.string(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional()
    })
    .optional()
});

const doctors = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    type: z.literal('doctor'),
    phone: z.string().optional(),
    email: z.string().optional(),
    whatsapp: z.string().optional(),
    bookingUrl: z.string().url().optional(),
    headshot: z.string().optional(),
    verified: z.boolean().optional(),
    licenseStatus: z.string().optional(),
    valueProp: z.string().optional(),
    trust: z
      .object({
        boardCertified: z.boolean().optional(),
        hospitalPrivileges: z.boolean().optional(),
        cme: z.boolean().optional(),
        languages: z.array(z.string()).optional()
      })
      .optional(),
    carePhilosophy: z.array(z.string()).optional(),
    focusAreas: z.array(z.string()).optional(),
    consultationModes: z.array(z.string()).optional(),
    degrees: z
      .array(
        z.object({
          title: z.string(),
          institution: z.string(),
          year: z.string().optional()
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
          feeRange: z.string().optional(),
          remarks: z.string().optional(),
          phone: z.string().optional(),
          email: z.string().optional(),
          whatsapp: z.string().optional(),
          bookingUrl: z.string().url().optional(),
          mapUrl: z.string().url().optional(),
          mapEmbed: z.string().optional()
        })
      )
      .optional(),
    reviewLinks: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url()
        })
      )
      .optional(),
    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
          category: z.string().optional()
        })
      )
      .optional(),
    appointmentHours: z.string().optional(),
    emergencyNote: z.string().optional(),
    socialLinks: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url()
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
