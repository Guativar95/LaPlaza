import React, { ReactNode } from 'react'
import { FieldError } from 'react-hook-form'
import clsx from 'clsx'

const variants = {
  left: '',
  bottom: '',
}

type FieldWrapperProps = {
  label?: string | ReactNode
  className?: string
  children?: React.ReactNode
  error?: FieldError | undefined
  description?: string
  variant?: keyof typeof variants
  required?: boolean
}

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, error, children, required, variant = 'bottom' } = props

  return (
    <div>
      {label ? (
        <label className={clsx('block font-medium text-gray-700', className)}>
          <VariantField label={label} variant={variant} required={required}>
            {children}
          </VariantField>
        </label>
      ) : (
        <VariantField label={label} variant={variant} required={required}>
          {children}
        </VariantField>
      )}
      {error?.message && (
        <div role='alert' aria-label={error.message} className='text-sm text-red-500'>
          {error.message}
        </div>
      )}
    </div>
  )
}

type VariantFieldProps = {
  variant: keyof typeof variants
  label?: string | ReactNode
  required?: boolean
  children: ReactNode
}
const VariantField = ({ variant, label, required, children }: VariantFieldProps) => {
  if (variant === 'bottom') {
    return (
      <>
        <span className={required ? 'after:content-["*"] after:pl-1 after:text-red-500' : ''}>
          {label}
        </span>
        {children && <div className={`${label && 'mt-1'}`}>{children}</div>}
      </>
    )
  }

  if (variant === 'left') {
    return (
      <div className='my-1'>
        {children}
        <span className='ml-2 select-none'>{label}</span>
      </div>
    )
  }

  return <></>
}
