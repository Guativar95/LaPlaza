import z from 'zod'

import v from '@/utils/zodValidations'

export const financialAndLaborInfoSchema = z.object({
  totalMonthlyIncome: v.number(),
  professionId: v.selectString(),
  occupationId: v.selectString(),
  companyName: v.string({ required: true, max: 50 }),
  position: v.string({ required: true, max: 50 }),
  yearsOfService: v.number(),
  contractTypeId: v.selectString(),
  workAddress: v.string({ required: true, max: 50 }),
  departmentId: v.selectString(),
  cityId: v.selectString(),
  phoneNumber: v.string(),
})

export type FinancialAndLaborInfoValues = z.infer<typeof financialAndLaborInfoSchema>
