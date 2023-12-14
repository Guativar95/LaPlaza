import { DefaultValues } from 'react-hook-form'
import { z } from 'zod'

import v from '@/utils/zodValidations'

export const healthSchema = z.object({
  hasDiseases: v.boolean(),
  hasDisabilities: v.boolean(),
  requiresUrgentMedicalAttention: v.boolean(),
  isFullyVaccinated: v.boolean(),
  weight: v.number(),
  height: v.number(),
})
export type HealthValues = z.infer<typeof healthSchema>

export const extraApplicantInfoSchema = z.object({
  hobbies: v.string({ required: true }),
  location: v.string({ required: true }),
  hasSocialNetworks: v.boolean(),
  twitter: v.string(),
  instagram: v.string(),
  facebook: v.string(),
  linkedin: v.string(),
  landLine: v.string(),
  mailSending: v.selectString(),
  neighborhood: v.string({ required: true }),
})
export type ExtraApplicantInfoValues = z.infer<typeof extraApplicantInfoSchema>

export const beneficiarySchema = z.object({
  beneficiaries: z.array(
    z.object({
      name: v.string({ required: true }),
      relationship: v.string({ required: true }),
      percentage: v.number().min(1, 'El mínimo es 1'),
    })
  ),
  totalPercentage: v.number().min(100, 'El total debe ser 100%').max(100, 'El total debe ser 100%'),
})
export type BeneficiaryValues = z.infer<typeof beneficiarySchema>

export const financialInfoSchema = z
  .object({
    lastMonthTotalOutcome: v.number(),
    lastMonthTotalAssets: v.number(),
    lastMonthTotalLiabilities: v.number(),
    isAnIncomeTaxFiler: v.boolean(),
    lastYearTotalIncome: z.null().or(v.number()),
    lastYearTotalPatrimony: z.null().or(v.number()),
    familyExpenses: v.number(),
    loans: v.number(),
    leaseOrMortgage: v.number(),
    creditCard: v.number(),
    economicSectorId: v.selectString(),
    ciiuCode: v.selectString(),
  })

  .refine(
    (values) => {
      if (values.isAnIncomeTaxFiler) return true

      return !!values.lastYearTotalIncome
    },
    {
      path: ['lastYearTotalIncome'],
      message: 'Campo requerido',
    }
  )
  .refine(
    (values) => {
      if (values.isAnIncomeTaxFiler) return true

      return !!values.lastYearTotalPatrimony
    },
    {
      path: ['lastYearTotalPatrimony'],
      message: 'Campo requerido',
    }
  )
export type FinancialInfoValues = z.infer<typeof financialInfoSchema>

export type CreditSelectionValues = {
  chosenAmount: number
  chosenTerm: number
}

export type FormProps<T> = {
  isLoading?: boolean
  onPrevious?: () => void
  onSuccess: (values: T) => void
  defaultValues?: DefaultValues<T>
}

export type ExtraCreditFields = HealthValues &
  ExtraApplicantInfoValues &
  FinancialInfoValues &
  Omit<BeneficiaryValues, 'totalPercentage'> & { creditSelection: CreditSelectionValues }
