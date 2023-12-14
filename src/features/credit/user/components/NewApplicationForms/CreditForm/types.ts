import { z } from 'zod'

import v from '@/utils/zodValidations'

export const creditSchema = z.object({
  deadline: v.number(),
  initialPayment: v.number(),
  quotaOriginId: v.selectString(),
})

export type CreditValues = z.infer<typeof creditSchema>

export type FullCreditValues = CreditValues & {
  valueToFinance: number
}
