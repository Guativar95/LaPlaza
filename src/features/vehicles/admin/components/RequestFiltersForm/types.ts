import { z } from 'zod'

export const requestFiltersSchema = z.object({
  licencePlate: z
    .string()
    .regex(/^[A-Z]{3}[\d]{3}$/, 'Placa invalida')
    .or(z.string().length(0)),
  statusId: z.string(),
})

export type RequestFiltersValues = z.infer<typeof requestFiltersSchema>
