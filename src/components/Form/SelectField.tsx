import { ReactNode, SelectHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import clsx from 'clsx'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

export type Option = {
  label: ReactNode
  value: string | number | string[]
}

export type SelectFieldProps = FieldWrapperPassThroughProps &
  SelectHTMLAttributes<HTMLElement> & {
    options: Option[]
    className?: string
    defaultValue?: string
    placeholder?: string
    registration?: Partial<UseFormRegisterReturn>
  }

export const SelectField = (props: SelectFieldProps) => {
  const { label, options, error, className, defaultValue, registration, required, ...rest } = props
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <select
        required={required}
        name='location'
        className={clsx(
          'block w-full px-4 py-2.5 mt-2 border-gray-200 focus:outline-none focus:ring-primary-50 focus:border-primary-50 sm:text-sm rounded-md disabled:bg-gray-100',
          className
        )}
        defaultValue={defaultValue}
        {...registration}
        {...rest}
      >
        {options.map(({ label, value }) => (
          <option key={`${label?.toString()}-${value}`} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  )
}
