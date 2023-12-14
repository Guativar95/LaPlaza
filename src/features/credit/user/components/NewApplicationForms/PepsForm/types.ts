import z from 'zod'

import v from '@/utils/zodValidations'

export const publiclyExposedPersonSchema = z.object({
  organization: v.string({ required: true, max: 50 }),
  position: v.string({ required: true, max: 50 }),
  handlesPublicResources: v.boolean(),
  unbundlingDate: v.string().optional(),
})

export const pepsSchema = z.object({
  isPublicServant: v.boolean(),
  publiclyExposedPerson: publiclyExposedPersonSchema.optional(),
})

export type PubliclyExposedPersonValues = z.infer<typeof publiclyExposedPersonSchema>

export type PepsValues = z.infer<typeof pepsSchema>
