import React from 'react'
import {
  ApplicationStatus,
  ApprovedOption,
  CreditResponse,
  CreditStatusResponse,
  VerificationData,
} from '@credit/common'

export type ApplicationState = {
  id: string
  status: ApplicationStatus | 'notCreated' | 'loading'
  guarantors: []
  vehicleId: string
}

export type ApplicationContextValues = {
  application: ApplicationState
  approvedOptions: ApprovedOption[]
  initialPayment: number
  verificationData: VerificationData
  handleApplicationResponse: (data: CreditStatusResponse | CreditResponse) => void
  setVerificationData: React.Dispatch<React.SetStateAction<VerificationData>>
}
