import { useState } from 'react'
import { resendOTP } from '@credit/user/api/resendOtp'
import { sendOTPs } from '@credit/user/api/sendOTP'
import { verifyOTPs } from '@credit/user/api/verifyOTP'

import { OTPVerificationStatus } from './types'

export type UseOtp = {
  applicationId: string
  initialVerificationStatus?: OTPVerificationStatus
}

export type SendArgs = { phoneNumber: string; email: string }
export type ResendArgs = { phoneNumber: string } | { email: string }
export type VerifyArgs = { emailCode: string; smsCode: string }

export const useApplicationOtp = ({ applicationId, initialVerificationStatus }: UseOtp) => {
  const [verificationStatus, setVerificationStatus] = useState(
    initialVerificationStatus ?? OTPVerificationStatus.pending
  )
  const [otpCodeId, setOtpCodeId] = useState(0)

  const send = async (data: SendArgs) => {
    setVerificationStatus(OTPVerificationStatus.sending)
    try {
      const { status, data: otpId } = await sendOTPs({
        requestCode: applicationId,
        ...data,
      })

      if (status === 200) {
        setVerificationStatus(OTPVerificationStatus.sent)
        setOtpCodeId(otpId)
      } else {
        setVerificationStatus(OTPVerificationStatus.error)
      }
    } catch (error) {
      setVerificationStatus(OTPVerificationStatus.error)
    }
  }
  const resend = async (data: ResendArgs) => {
    setVerificationStatus(OTPVerificationStatus.resending)
    try {
      const { status, data: otpId } = await resendOTP({
        requestCode: applicationId,
        ...data,
      })

      if (status === 200) {
        setVerificationStatus(OTPVerificationStatus.sent)
        setOtpCodeId(otpId)
      } else {
        setVerificationStatus(OTPVerificationStatus.error)
      }
    } catch (error) {
      setVerificationStatus(OTPVerificationStatus.error)
    }
  }
  const verify = async (data: VerifyArgs) => {
    setVerificationStatus(OTPVerificationStatus.verifying)
    try {
      const { status } = await verifyOTPs({
        otpCodeId,
        ...data,
      })

      if (status === 200) {
        return setVerificationStatus(OTPVerificationStatus.verified)
      }

      return setVerificationStatus(OTPVerificationStatus.error)
    } catch (error: any) {
      const errorCode = error?.response?.status
      setVerificationStatus(
        errorCode === 400 ? OTPVerificationStatus.failure : OTPVerificationStatus.error
      )
    }
  }

  return {
    verificationStatus,
    setVerificationStatus,
    send,
    resend,
    verify,
    otpCodeId,
  }
}
