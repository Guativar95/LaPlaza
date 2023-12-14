import { ChangeEvent, useState } from 'react'
import { FieldError } from 'react-hook-form'
import z from 'zod'

import { Form, PasswordField } from '@/components/Form'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  newPassword: z
    .string()
    .min(1, 'Campo requerido')
    .regex(/[a-z]{1,}/, 'Debe contener al menos una minúscula')
    .regex(/[A-Z]{1,}/, 'Debe contener una mayúscula')
    .regex(/[\d]{1,}/, 'Debe tener al menos un número')
    .regex(/[!@#$%&*+]/, 'Debe tener al menos un caracter especial (!@#$%&*+)')
    .min(8, 'Debe ser de al menos 8 caracteres')
    .max(16, 'Debe tener máximo 16 caracteres'),
  confirmPassword: z.string().min(1, 'Campo requerido'),
})

export type ChangePasswordValues = {
  newPassword: string
  confirmPassword: string
}

export interface ChangePasswordFormProps {
  disabled?: boolean
  onSuccess: (values: ChangePasswordValues) => Promise<void>
}

export const ChangePasswordForm = ({ onSuccess, disabled }: ChangePasswordFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [equalFieldsError, setEqualFieldsError] = useState<FieldError | undefined>({} as FieldError)
  const handleSubmit = async (values: ChangePasswordValues) => {
    setIsSubmitting(true)
    await onSuccess(values)
    setIsSubmitting(false)
  }

  return (
    <Form<ChangePasswordValues, typeof schema>
      onSubmit={handleSubmit}
      schema={schema}
      options={{ mode: 'all' }}
    >
      {({ register, formState, getValues }) => (
        <>
          <PasswordField
            label={
              <span className='text-lg font-itc-avant-garde-gothic-demi'>Nueva contraseña</span>
            }
            error={formState.errors?.newPassword}
            registration={register('newPassword', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value || ''

                if (value !== getValues('confirmPassword')) {
                  setEqualFieldsError({
                    type: 'custom',
                    message: 'Las contraseñas no coinciden',
                  })
                } else {
                  setEqualFieldsError(undefined)
                }
              },
            })}
          />

          <PasswordField
            label={
              <span className='text-lg font-itc-avant-garde-gothic-demi'>Confirmar contraseña</span>
            }
            error={formState.errors?.confirmPassword || equalFieldsError}
            registration={register('confirmPassword', {
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value || ''

                if (value !== getValues('newPassword')) {
                  setEqualFieldsError({
                    type: 'custom',
                    message: 'Las contraseñas no coinciden',
                  })
                } else {
                  setEqualFieldsError(undefined)
                }
              },
            })}
          />

          <div className='flex justify-center'>
            <Button
              type='submit'
              variant='gradient'
              isLoading={isSubmitting}
              disabled={Boolean(equalFieldsError) || !formState.isValid || disabled}
            >
              Cambiar
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
