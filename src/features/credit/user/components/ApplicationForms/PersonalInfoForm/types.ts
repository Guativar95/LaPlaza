import z from 'zod'

import { v } from '@/utils/zodValidations'

const textRegex = /^[A-zÀ-ü ]+$/

export const personalInfoSchema = z.object({
  name: v.string({ required: true, max: 15 }).regex(textRegex, 'Solo puede contener letras'),
  secondName: v
    .string()
    .length(0, 'Solo puede contener letras')
    .or(v.string({ max: 15 }).regex(textRegex, 'Solo puede contener letras')),
  lastName: v.string({ required: true, max: 15 }).regex(textRegex, 'Solo puede contener letras'),
  secondLastName: v
    .string()
    .length(0, 'Solo puede contener letras')
    .or(v.string({ max: 15 }).regex(textRegex, 'Solo puede contener letras')),
  identificationTypeId: v.selectString(),
  identificationNumber: v.string({ required: true }),
  expeditionDate: v.string({ required: true }),
  email: v.string().email('Correo invalido'),
  address: v.string({ max: 50 }),
  cityId: v.selectString(),
  departmentId: v.selectString(),
  residenceTimeInYears: v.number(),
  socialStratumId: v.selectString(),
  birthDate: v.string({ required: true }),
  phoneNumber: v.string(),
  residenceTypeId: v.selectString(),
  maritalStatusId: v.selectString(),
  gender: v.string({ required: true }),
  dependants: v.number(),
  identificationIssuedIn: v.string({ required: true }),
})

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>

export enum OTPVerificationStatus {
  pending,
  sending,
  resending,
  sent,
  failure,
  verified,
  verifying,
  error,
}

export const otpSchema = z.object({
  emailCode: v.string({ required: true }).length(6, 'Debe ser de 6 caracteres'),
  smsCode: v.string({ required: true }).length(6, 'Debe ser de 6 caracteres'),
})

export type OtpValues = z.infer<typeof otpSchema>

export const resendEmailSchema = z.object({
  email: v.string({ required: true }).email('Correo invalido'),
})

export type ResendEmailValues = z.infer<typeof resendEmailSchema>

export const resendSmsSchema = z.object({
  phoneNumber: v.string({ required: true }).regex(/[\d]{10}/, 'Número invalido'),
})

export type ResendSmsValues = z.infer<typeof resendSmsSchema>
