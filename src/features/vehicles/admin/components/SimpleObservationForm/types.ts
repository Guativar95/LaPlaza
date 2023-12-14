import { z } from 'zod'

import v from '@/utils/zodValidations'

export const simpleObservationSchema = z.object({
  providerId: v.selectString(),
  description: v.string({ required: true, max: 200 }),
})

export type SimpleObservationValues = z.infer<typeof simpleObservationSchema>
