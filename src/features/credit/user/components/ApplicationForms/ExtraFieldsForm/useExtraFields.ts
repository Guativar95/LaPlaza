import { useEffect, useRef, useState } from 'react'

import { useSteps } from '@/hooks/useSteps'

import {
  BeneficiaryValues,
  CreditSelectionValues,
  ExtraApplicantInfoValues,
  ExtraCreditFields,
  FinancialInfoValues,
  HealthValues,
} from './types'

export type UseExtraFieldsParams = {
  onSuccess: (values: ExtraCreditFields) => void
}

export const useExtraFields = ({ onSuccess }: UseExtraFieldsParams) => {
  const mounted = useRef(false)

  const [creditSelection, setCreditSelection] = useState({} as CreditSelectionValues)
  const [extraPersonalInfo, setExtraPersonalInfo] = useState({} as ExtraApplicantInfoValues)
  const [financialInfo, setFinancialInfo] = useState({} as FinancialInfoValues)
  const [healthInfo, setHealthInfo] = useState({} as HealthValues)
  const [beneficiaries, setBeneficiaries] = useState({} as BeneficiaryValues)

  const step = useSteps()

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }

    onSuccess({
      creditSelection,
      ...extraPersonalInfo,
      ...financialInfo,
      ...healthInfo,
      ...beneficiaries,
    })
  }, [healthInfo])

  return {
    creditSelection,
    setCreditSelection,
    extraPersonalInfo,
    setExtraPersonalInfo,
    financialInfo,
    setFinancialInfo,
    healthInfo,
    setHealthInfo,
    beneficiaries,
    setBeneficiaries,
    step,
  }
}
