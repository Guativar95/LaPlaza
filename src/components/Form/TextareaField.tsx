import { TextareaHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import clsx from 'clsx'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

export type TextAreaFieldProps = FieldWrapperPassThroughProps &
  TextareaHTMLAttributes<HTMLElement> & {
    className?: string
    registration?: Partial<UseFormRegisterReturn>
  }

export const TextAreaField = (props: TextAreaFieldProps) => {
  const { label, className, registration, error, required, ...rest } = props
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <textarea
        className={clsx(
          'appearance-none font-normal block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-50 focus:border-primary-50 sm:text-sm disabled:bg-gray-100',
          className
        )}
        required={required}
        {...registration}
        {...rest}
      />
    </FieldWrapper>
  )
}
