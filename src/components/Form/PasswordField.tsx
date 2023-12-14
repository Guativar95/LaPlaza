import { InputHTMLAttributes, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import clsx from 'clsx'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

export type PasswordFieldProps = FieldWrapperPassThroughProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    registration?: Partial<UseFormRegisterReturn>
  }

export const PasswordField = (props: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const { label, className, registration, error, required, ...rest } = props

  return (
    <FieldWrapper label={label} error={error} required={required}>
      <div className='relative'>
        <input
          type={showPassword ? 'text' : 'password'}
          required={required}
          className={clsx(
            'block w-full px-4 py-2 font-normal mt-2 pr-8 text-black-700 bg-white placeholder:text-gray-400 border border-gray-200 rounded-md focus:border-primary-50 focus:ring-primary-50 focus:outline-none focus:ring focus:ring-opacity-40 disabled:bg-gray-100',
            className
          )}
          {...registration}
          {...rest}
        />
        <div className='absolute inset-0 flex items-center justify-end mr-2 pointer-events-none text-xl'>
          {showPassword ? (
            <button
              type='button'
              onClick={() => setShowPassword(false)}
              className='pointer-events-auto hover:opacity-85 hover:cursor-default'
              aria-label='Ocultar contraseña'
            >
              <BiHide />
            </button>
          ) : (
            <button
              type='button'
              onClick={() => setShowPassword(true)}
              className='pointer-events-auto hover:opacity-85 hover:cursor-default'
              aria-label='Mostrar contraseña'
            >
              <BiShowAlt />
            </button>
          )}
        </div>
      </div>
    </FieldWrapper>
  )
}
