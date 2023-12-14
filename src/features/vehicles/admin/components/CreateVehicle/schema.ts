import z from 'zod'

const commonErrorMsgs = {
  unselect: 'Seleccione una opción',
  required: 'Campo obligatorio',
  invalidNumber: 'Valor invalido',
}

const textRegex = /^[A-zÀ-ü ]+$/

export const schema = z.object({
  codeFasecolda: z
    .string({ required_error: commonErrorMsgs.required })
    .regex(/^[0-9]{8}$/, 'Código invalido'),
  licencePlate: z.string().regex(/^[A-Z]{3}[0-9]{3}$/, 'Placa invalida'),
  modelId: z.string().min(1, commonErrorMsgs.unselect),
  serviceId: z.number({ invalid_type_error: commonErrorMsgs.unselect }),
  brandId: z.string().min(1, commonErrorMsgs.unselect),
  classId: z.string().min(1, commonErrorMsgs.unselect),
  chassisNumber: z.string().min(1, commonErrorMsgs.required).max(17, 'Máximo 17 digitos'),
  originId: z.number({ invalid_type_error: commonErrorMsgs.unselect }),
  engine: z.string().min(1, commonErrorMsgs.required).max(17, 'Máximo 17 caracteres'),
  lineId: z.number({ invalid_type_error: commonErrorMsgs.unselect }),
  mainColor: z
    .string()
    .min(1, commonErrorMsgs.required)
    .regex(textRegex, 'Solo debe contener caracteres'),
  secondaryColor: z
    .string()
    .length(0, 'Solo debe contener caracteres')
    .or(z.string().regex(textRegex, 'Solo debe contener caracteres').optional()),
  conditionId: z.number({ invalid_type_error: commonErrorMsgs.unselect }),
  grossValue: z.number({
    required_error: commonErrorMsgs.required,
    invalid_type_error: commonErrorMsgs.invalidNumber,
  }),
  typeFuelId: z.number({ invalid_type_error: commonErrorMsgs.unselect }),
  officeId: z.number({ invalid_type_error: commonErrorMsgs.unselect }),
  typeBodyworkId: z.number({ invalid_type_error: commonErrorMsgs.unselect }),
  mileage: z
    .string({ required_error: commonErrorMsgs.required })
    .regex(/^[0-9]+$/, 'Debe ser un valor numerico'),
  description: z.string().min(1, commonErrorMsgs.required),
  typeTransmissionId: z.number({ invalid_type_error: commonErrorMsgs.unselect }),
  typeTractionId: z.number({ invalid_type_error: commonErrorMsgs.unselect }),

  distplacement: z.string().min(1, commonErrorMsgs.required),
  serie: z.string().min(1, commonErrorMsgs.required),
  doors: z.number({ invalid_type_error: 'Campo requerido' }),
  capacity: z.number({ invalid_type_error: 'Campo requerido' }),
  vinNumber: z.string().min(1, commonErrorMsgs.required),
  cityCode: z.string().min(1, 'Campo requerido'),
})
