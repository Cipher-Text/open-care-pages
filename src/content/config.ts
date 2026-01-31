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
  schema: baseSchema.extend({ type: z.literal('doctor') })
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
