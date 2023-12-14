import { z } from 'zod'

import v from '@/utils/zodValidations'

export const simpleNumericSchema = z.object({
  value: v.number(),
})

export type SimpleNumericValues = z.infer<typeof simpleNumericSchema>
