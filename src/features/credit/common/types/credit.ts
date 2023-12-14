import { DefaultValues } from 'react-hook-form'

import { Applicant, RequestDetail } from './applicant'

export interface Application {
  code: string
  applicant: Applicant
  requestDetail: RequestDetail
  hdim: string
  jsc: string
}

export interface ApplicationProgress extends DefaultValues<Omit<Application, 'hdim' | 'jsc'>> {
  code: string
  step: number
}

export enum ApplicationStatus {
  inProcess = 'InProcess',
  rejectedWithOptions = 'RejectedWithOptions',
  rejected = 'Rejected',
  approved = 'Approved',
  verificationRequired = 'VerificationRequired',
  waitingForSignature = 'WaitingForSignature',
  signed = 'Signed',
  delivered = 'Delivered',
  continue = 'Continue',
  canceled = 'Canceled',
}

export interface ApprovedOption {
  month: string
  value: number
}

export type ApprovedData = {
  fees: ApprovedOption[]
}

export type ApprovedCreditResponse = {
  status: ApplicationStatus.approved
  data: ApprovedData
}

export type RejectedCreditData = {
  suggestedInitialFee: number
}

export type RejectedWithOptionsCreditResponse = {
  status: ApplicationStatus.rejectedWithOptions
  data: RejectedCreditData
}

export type RejectedCreditResponse = {
  status: ApplicationStatus.rejected
}

export type VerificationAnswer = {
  id: string
  text: string
}

export type VerificationQuestion = {
  id: string
  text: string
  order: number
  posibleAnswers: VerificationAnswer[]
}

export type VerificationData = {
  isValidationSuccess: boolean
  questionnaireId: number
  questionnaireReg: number
  questions: VerificationQuestion[]
}

export type VerificationCreditResponse = {
  status: ApplicationStatus.verificationRequired
  data: VerificationData
}

export type ContinueCreditResponse = {
  status: ApplicationStatus.continue
}

export type CanceledCreditResponse = {
  status: ApplicationStatus.canceled
}

export type OtherCreditResponse = {
  status:
    | ApplicationStatus.delivered
    | ApplicationStatus.inProcess
    | ApplicationStatus.signed
    | ApplicationStatus.waitingForSignature
}

export type CreditResponse =
  | ApprovedCreditResponse
  | RejectedWithOptionsCreditResponse
  | RejectedCreditResponse
  | VerificationCreditResponse
  | ContinueCreditResponse
  | CanceledCreditResponse
  | OtherCreditResponse

export type CreditStatusResponse = CreditResponse & {
  vehicleId: string
}
