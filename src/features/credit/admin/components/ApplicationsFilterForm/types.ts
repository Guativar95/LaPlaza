import { z } from 'zod'

import v from '@/utils/zodValidations'

export const applicationsSearcherSchema = z.object({
  licencePlate: v.string({ required: true }).regex(/[a-zA-Z]{3}[\d]{3}/, 'Placa invalida'),
})

export type ApplicationsSearcherValues = z.infer<typeof applicationsSearcherSchema>
