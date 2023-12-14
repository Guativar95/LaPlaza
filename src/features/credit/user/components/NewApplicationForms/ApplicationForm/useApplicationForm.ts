import { useState } from 'react'
import { Applicant } from '@credit/common'
import { useApplicantForm } from '@credit/user/hooks/useApplicantForm'

import { CreditValues } from '../CreditForm/types'

export type UseApplicationForm = {
  applicationId: string
  isVerified?: boolean
  onSuccessApplicant: (data: Applicant) => void
}

export const useApplicationForm = ({
  onSuccessApplicant,
  isVerified,
  applicationId,
}: UseApplicationForm) => {
  const applicant = useApplicantForm({ onSuccess: onSuccessApplicant, isVerified, applicationId })
  const [creditInfo, setCreditInfo] = useState<CreditValues>()

  return {
    ...applicant,
    creditInfo,
    setCreditInfo,
  }
}
