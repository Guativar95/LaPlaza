import z from 'zod'

import v from '@/utils/zodValidations'

export const schema = z.object({
  licencePlate: z.string().min(1, '*Campo requerido').length(6, 'Debe tener 6 caracteres'),
  modelId: z.string().min(1, '*Campo requerido'),
  serviceId: v.selectNumber(),
  chassisNumber: z.string().min(1, '*Campo requerido').max(17, 'Máximo 17 digitos'),
  engine: z.string().min(1, '*Campo requerido').max(17, 'Máximo 17 digitos'),
  mainColor: z.string().min(1, '*Campo requerido'),
  secondaryColor: z.string().min(1, '*Campo requerido'),
  grossValue: v.number(),
})
