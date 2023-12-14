import { FC, Ref, useEffect, useRef, useState } from 'react'
import { Alert } from 'flowbite-react'

import { Form, NumericField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { otpSchema, OtpValues, OTPVerificationStatus } from './types'
import { VerifyArgs } from './useApplicationOtp'

export type NewOtpModalProps = {
  show: boolean
  status: OTPVerificationStatus
  onVerify: (d: VerifyArgs) => void
  onResendEmail: () => void
  onResendSms: () => void
  onReject: () => void
}

const TIME_TO_RESEND = 30
export const NewOtpModal: FC<NewOtpModalProps> = ({
  show,
  status,
  onVerify,
  onReject,
  onResendEmail,
  onResendSms,
}) => {
  const formRef = useRef<HTMLFormElement>()
  const idTimerSmsRef = useRef<ReturnType<typeof setInterval>>()
  const idTimerEmailRef = useRef<ReturnType<typeof setInterval>>()
  const [timerSms, setTimerSms] = useState(0)
  const [timerEmail, setTimerEmail] = useState(0)

  const dispatchSubmit = () => {
    if (!formRef) return

    formRef.current?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
  }

  const handleResendSms = () => {
    onResendSms()
    setTimerSms(TIME_TO_RESEND)
    idTimerSmsRef.current = setInterval(() => setTimerSms((t) => t - 1), 1000)
  }

  const handleResendEmail = () => {
    onResendEmail()
    setTimerEmail(TIME_TO_RESEND)
    idTimerEmailRef.current = setInterval(() => setTimerEmail((t) => t - 1), 1000)
  }

  useEffect(() => {
    if (timerSms === 0) {
      clearInterval(idTimerSmsRef.current)
    }
  }, [timerSms])

  useEffect(() => {
    if (timerEmail === 0) {
      clearInterval(idTimerEmailRef.current)
    }
  }, [timerEmail])

  useEffect(() => {
    return () => {
      clearInterval(idTimerEmailRef.current)
      clearInterval(idTimerSmsRef.current)
    }
  }, [])

  return (
    <Modal show={show} size='sm'>
      <ModalHeader title='Verificación de códigos' />
      <ModalBody>
        <div>
          {status === OTPVerificationStatus.sending && (
            <Alert color='info' className='my-2'>
              <p>Enviando códigos...</p>
            </Alert>
          )}
          <p className='text-gray-600 mb-5'>
            Hemos enviado códigos de verificación a tu correo electrónico y celular para comprobar
            que tienes acceso
          </p>
          <Form<OtpValues, typeof otpSchema>
            onSubmit={onVerify}
            schema={otpSchema}
            innerRef={formRef as Ref<HTMLFormElement>}
          >
            {({ control, formState }) => (
              <>
                <NumericField
                  label='Código enviado al correo'
                  control={control}
                  name='emailCode'
                  error={formState.errors.emailCode}
                  autoComplete='off'
                  valueAs='string'
                  maxLength={6}
                />
                <NumericField
                  label='Código enviado al celular'
                  control={control}
                  name='smsCode'
                  error={formState.errors.smsCode}
                  autoComplete='off'
                  valueAs='string'
                  maxLength={6}
                />
              </>
            )}
          </Form>

          <div className='my-2'>
            {status === OTPVerificationStatus.failure && (
              <Alert color='failure'>
                <p>Los códigos ingresados son incorrectos, vuelva a intentar</p>
              </Alert>
            )}

            {status === OTPVerificationStatus.error && (
              <Alert color='failure'>
                <p>Hemos tenido problemas realizando la transacción</p>
              </Alert>
            )}
          </div>

          <details
            className={
              ![
                OTPVerificationStatus.sending,
                OTPVerificationStatus.verified,
                OTPVerificationStatus.verifying,
              ].includes(status)
                ? 'my-2'
                : 'hidden'
            }
          >
            <summary className='select-none'>¿No recibiste algún código?</summary>
            <div className='flex gap-2 px-1 py-2'>
              <Button
                color='light'
                className='w-full'
                onClick={handleResendSms}
                disabled={timerSms > 0}
              >
                {timerSms ? `Reenviar SMS (en ${timerSms})` : 'Reenviar SMS'}
              </Button>
              <Button
                color='light'
                className='w-full'
                onClick={handleResendEmail}
                disabled={timerSms > 0}
              >
                {timerEmail ? `Reenviar correo (en ${timerEmail})` : 'Reenviar correo'}
              </Button>
            </div>
          </details>

          <div className='flex justify-end gap-2 mt-5'>
            <Button color='light' onClick={() => onReject()}>
              Volver
            </Button>
            <Button
              variant='gradient'
              isLoading={OTPVerificationStatus.verifying === status}
              disabled={[
                OTPVerificationStatus.verified,
                OTPVerificationStatus.sending,
                OTPVerificationStatus.resending,
                OTPVerificationStatus.verifying,
                OTPVerificationStatus.error,
              ].includes(status)}
              onClick={dispatchSubmit}
            >
              Validar
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}
