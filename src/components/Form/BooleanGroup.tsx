import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form'

import { RadioField } from './RadioField'

export type BooleanGroupProps<T extends FieldValues = Record<string, unknown>> = {
  control: Control<T, any>
  name: Path<T>
  error?: FieldError
  label: string
  yesLabel?: string
  noLabel?: string
  required?: boolean
  onValueChange?: (val: boolean) => void
}

export const BooleanGroup = <T extends FieldValues = Record<string, unknown>>({
  control,
  name,
  error,
  label,
  yesLabel,
  noLabel,
  onValueChange,
  required,
}: BooleanGroupProps<T>) => {
  return (
    <div>
      <p className={required ? 'after:content-[" *"] after:pl-1 after:text-red-500' : ''}>
        {label}
      </p>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, name } }) => (
          <div className='flex gap-3 py-2'>
            <RadioField
              label={yesLabel || 'Sí'}
              name={name}
              onChange={() => {
                onChange(true)
                onValueChange && onValueChange(true)
              }}
              checked={value === true}
            />
            <RadioField
              label={noLabel || 'No'}
              name={name}
              onChange={() => {
                onChange(false)
                onValueChange && onValueChange(false)
              }}
              checked={value === false}
            />
          </div>
        )}
      />
      {error && <span className='text-sm text-red-500'>{error.message}</span>}
    </div>
  )
}
