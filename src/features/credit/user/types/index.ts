export enum VerificationStatus {
  verified = 'verified',
  reviewNeeded = 'reviewNeeded',
  rejected = 'rejected',
  processing = 'processing',
}

export interface ApplicantData {
  name: string
  secondName: string
  lastName: string
  secondLastName: string
  identificationNumber: string
  expeditionDate: string
  birthDate: string
}
