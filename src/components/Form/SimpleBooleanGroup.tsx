import React, { InputHTMLAttributes, useState } from 'react'
import { FieldError } from 'react-hook-form'

import { RadioField } from './RadioField'

export type SimpleBooleanGroupProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'defaultValue'
> & {
  defaultValue?: boolean
  error?: FieldError
  label: string
  yesLabel?: string
  noLabel?: string
  required?: boolean
  onValueChange?: (val: boolean) => void
}

export const SimpleBooleanGroup: React.FC<SimpleBooleanGroupProps> = ({
  defaultValue,
  label,
  error,
  yesLabel,
  noLabel,
  onChange,
  onValueChange,
  required,
  ...rest
}) => {
  const [value, setValue] = useState<boolean | undefined>(defaultValue)

  return (
    <div>
      <p className={required ? 'after:content-[" *"] after:pl-1 after:text-red-500' : ''}>
        {label}
      </p>
      <div className='flex gap-3 py-2'>
        <RadioField
          label={yesLabel || 'Sí'}
          onChange={(e) => {
            setValue(true)
            onChange && onChange(e)
            onValueChange && onValueChange(true)
          }}
          checked={value === true}
          required={required}
          {...rest}
        />
        <RadioField
          label={noLabel || 'No'}
          onChange={(e) => {
            setValue(false)
            onChange && onChange(e)
            onValueChange && onValueChange(false)
          }}
          checked={value === false}
          required={required}
          {...rest}
        />
      </div>
      {error && <span className='text-sm text-red-500'>{error.message}</span>}
    </div>
  )
}
