import { z } from 'zod'

import v from '@/utils/zodValidations'

export const referencesSchema = z.object({
  references: z
    .array(
      z.object({
        name: v.string({ required: true }),
        lastName: v.string({ required: true }),
        phoneNumber: v.string(),
        cellphoneNumber: v.string({ required: true }),
        relationShip: v.string({ required: true }),
      })
    )
    .min(2, 'Debe agregar al menos dos referencias'),
})
export type ReferenceValues = z.infer<typeof referencesSchema>
