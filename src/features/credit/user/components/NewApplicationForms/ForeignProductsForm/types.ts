import { Ref } from 'react'
import { DefaultValues } from 'react-hook-form'
import z from 'zod'

import v from '@/utils/zodValidations'

export const internationalBusinessSchema = z.object({
  internationalBusinessTypeId: v.selectString(),
})

export const internationalAccountSchema = z.object({
  countryId: v.string({ required: true }),
  productNumber: v.string(),
  internationalProductTypeId: v.string({ required: true }),
  anotherInternationalProductType: v.string(),
  entity: v.string({ required: true }),
  currencyId: v.string({ required: true }),
  cityId: v.string({ required: true }),
  value: v.number(),
})

export const internationalPatrimonySchema = z.object({
  countryId: v.string({ required: true }),
  cityId: v.string({ required: true }),
})

export const ForeignProductsSchema = z.object({
  hasInternationalBusiness: v.boolean(),
  hasInternationalAccount: v.boolean(),
  hasInternationalPatrimony: v.boolean(),
  internationalBusiness: z.null().or(internationalBusinessSchema.optional()),
  internationalAccount: z.null().or(internationalAccountSchema.optional()),
  internationalPatrimony: z.null().or(internationalPatrimonySchema.optional()),
})

export type InternationalBusinessValues = z.infer<typeof internationalBusinessSchema>

export type InternationalAccountValues = z.infer<typeof internationalAccountSchema>

export type InternationalPatrimonyValues = z.infer<typeof internationalPatrimonySchema>

export type ForeignProductsValues = z.infer<typeof ForeignProductsSchema>

export type SubformBaseProps<T> = {
  onSuccess: (values: T) => void
  innerRef?: Ref<HTMLFormElement>
  defaultValues?: DefaultValues<T>
  saveProgressOnChange?: (values: DefaultValues<T>) => void
}
