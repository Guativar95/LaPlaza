import { InputHTMLAttributes, ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import clsx from 'clsx'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

export type InputFieldProps = FieldWrapperPassThroughProps &
  InputHTMLAttributes<HTMLInputElement> & {
    type?: 'text' | 'email' | 'password' | 'date' | 'url' | 'search' | 'number'
    registration?: Partial<UseFormRegisterReturn>
    leftIcon?: ReactNode
    rightIcon?: ReactNode
  }

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    label,
    className,
    registration,
    leftIcon,
    rightIcon,
    error,
    required,
    ...rest
  } = props
  return (
    <FieldWrapper
      label={label}
      error={error}
      required={required}
      className={leftIcon || rightIcon ? 'relative' : ''}
    >
      {leftIcon && (
        <div className='absolute h-full top-0 left-0 flex items-center px-2.5'>{leftIcon}</div>
      )}
      <input
        type={type}
        className={clsx(
          'block w-full px-4 py-2 mt-2 text-black-700 bg-white placeholder:text-gray-400 border border-gray-200 rounded-md focus:border-primary-50 focus:ring-primary-50 focus:outline-none focus:ring focus:ring-opacity-40 disabled:bg-gray-100 disabled:text-gray-400',
          leftIcon && 'pl-8',
          rightIcon && 'pr-8',
          className
        )}
        required={required}
        {...registration}
        {...rest}
      />
      {rightIcon && (
        <div className='absolute h-full top-0 right-0 flex items-center px-2.5'>{rightIcon}</div>
      )}
    </FieldWrapper>
  )
}
