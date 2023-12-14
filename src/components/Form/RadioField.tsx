import { InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import clsx from 'clsx'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

type CheckboxFieldProps = FieldWrapperPassThroughProps &
  InputHTMLAttributes<HTMLInputElement> & {
    className?: string
    registration?: Partial<UseFormRegisterReturn>
  }

export const RadioField = (props: CheckboxFieldProps) => {
  const { label, className, registration, error, ...rest } = props
  return (
    <FieldWrapper label={label} error={error} variant='left'>
      <input
        type='radio'
        className={clsx(
          'rounded-full text-primary focus:outline-none focus:ring-primary focus:ring focus:ring-opacity-40',
          className
        )}
        {...rest}
        {...registration}
      />
    </FieldWrapper>
  )
}
