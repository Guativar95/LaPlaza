import { useCallback, useState } from 'react'
import { Alert } from 'flowbite-react'

import { sendRecoveryLinkByEmail } from '../api/recoverPassword'
import { Layout } from '../components/Layout'
import { RecoverPasswordForm, RecoverPasswordValues } from '../components/RecoverPasswordForm'

export const RecoverPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>()
  const onSuccess = useCallback(async ({ email }: RecoverPasswordValues) => {
    try {
      const res = await sendRecoveryLinkByEmail(email)
      setIsSubmitted(res.data)
    } catch (error) {
      setIsSubmitted(false)
    }
  }, [])

  return (
    <Layout title='Recuperar Contraseña'>
      <p className='mx-20 text-center text-2xl font-avant-gard-ef-book'>
        Ingresa el correo electrónico que usaste para registrarte.
      </p>
      {isSubmitted !== undefined &&
        (isSubmitted ? (
          <div className='pb-4'>
            <Alert color='success'>
              <span>Si tu correo está registrado, hemos enviado un enlace de recuperación</span>
            </Alert>
          </div>
        ) : (
          <div className='pb-4'>
            <Alert color='failure'>
              <span>
                Hemos tenido problemas enviando el correo de recuperación, por favor vuelve a
                intentar
              </span>
            </Alert>
          </div>
        ))}
      <RecoverPasswordForm onSuccess={onSuccess} disabled={isSubmitted} />
    </Layout>
  )
}
