import React, { ReactElement, useEffect, useState } from 'react'
import { VerificationStatus } from '@credit/user/types'

import { RejectedStep } from '../verification/RejectedStep'
import { ReviewNeededStep } from '../verification/ReviewNeededStep'
import { VerificationStep } from '../verification/VerificationStep'

type VerificationStatusStep = {
  uninitiated: ReactElement
} & {
  [k in VerificationStatus]?: ReactElement
}

export type VerificationFormProps = {
  applicationId: string
  onSuccess: () => void
  vehicleId?: string
  guarantorId?: number
  metadata?: Record<string, unknown>
}

export const VerificationForm: React.FC<VerificationFormProps> = ({
  applicationId,
  vehicleId,
  guarantorId,
  onSuccess,
  metadata,
}) => {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus | 'uninitiated'>(
    'uninitiated'
  )

  const elements: VerificationStatusStep = {
    uninitiated: (
      <VerificationStep
        applicationCode={applicationId}
        onFinishVerification={setVerificationStatus}
        onErrorVerification={() => setVerificationStatus(VerificationStatus.rejected)}
        metadata={metadata}
      />
    ),
    reviewNeeded: (
      <ReviewNeededStep
        applicationCode={applicationId}
        vehicleId={vehicleId}
        guarantorId={guarantorId}
      />
    ),
    rejected: <RejectedStep />,
  }

  useEffect(() => {
    if (verificationStatus === VerificationStatus.verified) {
      onSuccess()
    }
  }, [verificationStatus])

  return elements[verificationStatus] ?? null
}
