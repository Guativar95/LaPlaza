import { BiError } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { Alert } from 'flowbite-react'
import z from 'zod'

import { Form, InputField, PasswordField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/lib/auth'

const schema = z.object({
  identificationNumber: z
    .string()
    .min(1, '*Campo requerido')
    .max(10, 'Máximo 10 digitos')
    .regex(/^[1-9]{1}[0-9]{5,9}$/, 'Deben ser numérico'),
  password: z.string().min(1, '*Campo requerido'),
})

type LoginValues = {
  identificationNumber: string
  password: string
}

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, error, isLoggingIn } = useAuth()

  const handleSubmit = async (values: LoginValues) => {
    await login(values)
    onSuccess()
  }

  return (
    <Form<LoginValues, typeof schema> onSubmit={handleSubmit} schema={schema}>
      {({ register, formState }) => (
        <>
          <div className='px-20'>
            <InputField
              label={
                <span className='text-lg font-itc-avant-garde-gothic-demi'>Identificación</span>
              }
              type='text'
              error={formState.errors?.identificationNumber}
              registration={register('identificationNumber')}
            />
          </div>
          <div className='px-20'>
            <PasswordField
              label={<span className='text-lg font-itc-avant-garde-gothic-demi'>Contraseña</span>}
              error={formState.errors?.password}
              registration={register('password')}
            />
          </div>
          {error && (
            <div className='px-20'>
              <Alert color='failure'>
                <div className='flex items-center gap-2'>
                  <BiError className='text-2xl' />
                  <span>{error.message}</span>
                </div>
              </Alert>
            </div>
          )}
          <div className=' pt-2 flex justify-center'>
            <Link
              to='/auth/recuperar-clave'
              className='text-center font-itc-avant-garde-gothic-demi  text-primary hover:underline'
            >
              Olvidé mi contraseña
            </Link>
          </div>
          <div className='pb-8 flex justify-center'>
            <Button isLoading={isLoggingIn} variant='gradient' type='submit'>
              Continuar
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
