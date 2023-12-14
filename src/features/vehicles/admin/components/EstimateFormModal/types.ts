import { z } from 'zod'

import v from '@/utils/zodValidations'

export const estimateSchema = z.object({
  name: v.string({ required: true, max: 50 }),
})

export type EstimateValues = z.infer<typeof estimateSchema>
