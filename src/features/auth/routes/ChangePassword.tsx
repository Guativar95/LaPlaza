import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Alert } from 'flowbite-react'

import { Spinner } from '@/components/ui/Spinner'

import { resetPassword, validatePasswordRecoveryToken } from '../api/resetPassword'
import { ChangePasswordForm, ChangePasswordValues } from '../components/ChangePasswordForm'
import { Layout } from '../components/Layout'

export const ChangePassword = () => {
  const [isValidatingToken, setIsValidatingToken] = useState(true)
  const [isInvalidToken, setIsInvalidToken] = useState(false)
  const [isReset, setisReset] = useState<boolean>()

  const resetToken = useRef('')
  const [searchParams] = useSearchParams()
  const tokenFromParams = searchParams.get('token')

  const validateToken = useCallback(
    async (token: string) => {
      try {
        const res = await validatePasswordRecoveryToken(token)
        resetToken.current = res.data
      } catch (error) {
        setIsInvalidToken(true)
      } finally {
        setIsValidatingToken(false)
      }
    },
    [resetToken]
  )

  const onSucces = useCallback(async (values: ChangePasswordValues) => {
    try {
      const res = await resetPassword({
        resetToken: resetToken.current,
        newPassword: values.confirmPassword,
      })

      setisReset(res.data)
    } catch (error) {
      setisReset(false)
    }
  }, [])

  useEffect(() => {
    if (!tokenFromParams) {
      setIsInvalidToken(true)
      setIsValidatingToken(false)
      return
    }

    validateToken(tokenFromParams)
  }, [])

  return (
    <Layout title='Cambiar contraseña'>
      {isValidatingToken ? (
        <div className='text-center py-5'>
          <Spinner className='mx-auto mb-3' />
          <span>Verificando enlace...</span>
        </div>
      ) : isInvalidToken ? (
        <Alert color='failure' role='alert'>
          <span>El enlace de recuperación es invalido</span>{' '}
        </Alert>
      ) : (
        <>
          {isReset !== undefined &&
            (isReset ? (
              <div className='pb-4'>
                <Alert role='alert' color='success'>
                  <span>Contraseña cambiada satisfactoriamente. </span>
                  <Link to='/auth/login' className='underline'>
                    Ir al login
                  </Link>
                </Alert>
              </div>
            ) : (
              <div className='pb-4'>
                <Alert role='alert' color='failure'>
                  <span>Hemos tenido problemas al cambiar la contraseña</span>
                </Alert>
              </div>
            ))}
          <ChangePasswordForm onSuccess={onSucces} disabled={isReset} />
        </>
      )}
    </Layout>
  )
}
