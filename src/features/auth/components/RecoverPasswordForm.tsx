import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import z from 'zod'

import { Form, InputField } from '@/components/Form'
import { Button } from '@/components/ui/Button'

const schema = z.object({
  email: z.string().min(1, 'Campo requerido').email('Debe ser un correo valido'),
})

export type RecoverPasswordValues = {
  email: string
}

export interface RecoverPasswordFormProps {
  disabled?: boolean
  onSuccess: (values: RecoverPasswordValues) => Promise<void>
}

export const RecoverPasswordForm = ({ disabled, onSuccess }: RecoverPasswordFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = useCallback(async (values: RecoverPasswordValues) => {
    setIsSubmitting(true)
    await onSuccess(values)
    setIsSubmitting(false)
  }, [])

  return (
    <Form<RecoverPasswordValues, typeof schema> onSubmit={handleSubmit} schema={schema}>
      {({ register, formState }) => (
        <>
          <div className='px-20 pt-8'>
            <InputField
              label={
                <span className='text-lg font-itc-avant-garde-gothic-demi'>Correo Electrónico</span>
              }
              type='email'
              error={formState.errors?.email}
              registration={register('email')}
            />
          </div>
          <div className='pt-6 flex justify-center'>
            <Button variant='gradient' type='submit' isLoading={isSubmitting} disabled={disabled}>
              Enviar
            </Button>
          </div>
          <div className=' pt-2 flex justify-center'>
            <span className='font-avant-gard-ef-book'>¿Ya tienes una Cuenta?</span>
            <Link
              to='/auth/login'
              className='ml-2 pb-8 text-center font-itc-avant-garde-gothic-demi  text-primary hover:underline'
            >
              Iniciar Sesión
            </Link>
          </div>
        </>
      )}
    </Form>
  )
}
