import { creditApi } from '@/api/creditApi'

export interface Beneficiary {
  name: string
  relationship: string
  percentage: number
}

export interface CompleteApplicantInfoDTO {
  requestCode: string
  hobbies: string
  location: string
  hasSocialNetworks: boolean
  twitter: string
  facebook: string
  instagram: string
  linkedin: string
  hasDiseases: boolean
  hasDisabilities: boolean
  requiresUrgentMedicalAttention: boolean
  isFullyVaccinated: boolean
  weight: number
  height: number
  landLine: string
  economicSectorId: string
  ciiuCode: string
  mailSending: string
  familyExpenses: number
  loans: number
  leaseOrMortgage: number
  creditCard: number
  lastMonthTotalOutcome: number
  lastMonthTotalAssets: number
  lastMonthTotalLiabilities: number
  isAnIncomeTaxFiler: boolean
  lastYearTotalIncome: number | null
  lastYearTotalPatrimony: number | null
  neighborhood: string
  beneficiaries: Beneficiary[]
}

export const completeApplicantInfo = (data: CompleteApplicantInfoDTO) => {
  return creditApi.post('/applicants/completeInformation', data)
}
