import { z } from 'zod'

import v from '@/utils/zodValidations'

export const attatchmentSchema = z.object({
  images: z.array(z.instanceof(File)).min(1, 'Debe adjuntar al menos una imágen'),
  index: z.number(),
})

export const taxesSchema = z.array(z.object({ taxId: z.number(), value: z.number() }))

export const quotationsSchema = z.object({
  quotation: z.array(
    z
      .object({
        value: v.number(),
        total: v.number(),
        observation: v.string(), // TODO: refactor name, is an ID
        startDate: v.string(),
        endDate: v.string(),
        description: v.string({ required: true }),
        attatchment: z.null().or(attatchmentSchema),
        taxes: taxesSchema,
      })
      .refine(({ startDate }) => Boolean(startDate), {
        path: ['startDate'],
        message: 'Campo requerido',
      })
      .refine(({ endDate }) => Boolean(endDate), {
        path: ['endDate'],
        message: 'Campo requerido',
      })
      .refine(
        ({ startDate, endDate }) => {
          const fillDateFieldsRange = startDate && endDate
          if (!fillDateFieldsRange) return true

          return new Date(endDate).getTime() >= new Date(startDate).getTime()
        },
        {
          path: ['endDate'],
          message: 'Fecha fin debe ser mayor o igual a la inicial',
        }
      )
  ),
})

export type QuotationsValues = z.infer<typeof quotationsSchema>
export type AttatchmentValues = z.infer<typeof attatchmentSchema>
export type TaxesValues = z.infer<typeof taxesSchema>
