import { z, ZodDate, ZodNumber, ZodString } from 'zod'

export type StringFieldArgs = {
  required?: boolean
  min?: number
  max?: number
}
export type NumberFieldArgs = {
  min?: number
  max?: number
  isSelect?: boolean
}
export type DateFieldArgs = {
  min?: Date
  max?: Date
}

export const stringField = ({ required, min, max }: StringFieldArgs = {}) => {
  let zodType: ZodString = z.string({ required_error: 'Campo requerido' })

  if (required) zodType = zodType.min(1, 'Campo requerido')
  if (min) zodType = zodType.min(min, `Mínimo ${min} caracteres`)
  if (max) zodType = zodType.max(max, `Máximo ${max} caracteres`)

  return zodType
}

export const numberField = ({ min, max, isSelect }: NumberFieldArgs = {}) => {
  let zodNumber: ZodNumber = z.number({
    invalid_type_error: isSelect ? 'Seleccione una opción' : 'Número invalido',
    required_error: 'Campo requerido',
  })

  if (min) zodNumber = zodNumber.min(min, `Mínimo ${min}}`)
  if (max) zodNumber = zodNumber.max(max, `Máximo ${min}}`)

  return zodNumber
}

export const selectStringField = () => z.string().min(1, 'Seleccione una opción')
export const selectNumberField = () => z.number({ invalid_type_error: 'Seleccione una opción' })

export const dateField = ({ min, max }: DateFieldArgs = {}) => {
  let zodType: ZodDate = z.date({
    required_error: 'Campo requerido',
  })

  if (min) zodType = zodType.min(min, `Debe ser mayor a ${min.toLocaleDateString()}`)
  if (max) zodType = zodType.max(max, `Debe ser menor a ${max.toLocaleDateString()}`)

  return zodType
}

export const booleanField = () => z.boolean({ required_error: 'Campo requerido' })

export const v = {
  string: stringField,
  number: numberField,
  date: dateField,
  boolean: booleanField,
  selectString: selectStringField,
  selectNumber: selectNumberField,
}

export default v
