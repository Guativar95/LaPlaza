import { useState } from 'react'
import { Alert } from 'flowbite-react'
import { z } from 'zod'

import { Form, InputField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { Modal, ModalHeader } from '@/components/ui/Modal'
import { ModalBody } from '@/components/ui/Modal/ModalBody'

import { verifyOTPs } from '../api/verifyOTP'

interface OTPModalProps {
  otpCodeId: number
  show: boolean
  onVerify: () => Promise<void>
  onReject: () => void
}

const schema = z.object({
  emailCode: z.string().length(6, 'La longitud debe ser 6'),
  smsCode: z.string().length(6, 'La longitud debe ser 6'),
})

type OTPValues = {
  emailCode: string
  smsCode: string
}

export const OTPModal = ({ show, otpCodeId, onVerify, onReject }: OTPModalProps) => {
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [invalidCodes, setInvalidCodes] = useState(false)

  const handleSubmit = async (values: OTPValues) => {
    const data = {
      ...values,
      otpCodeId,
    }

    setIsSubmiting(true)
    setInvalidCodes(false)
    try {
      const res = await verifyOTPs(data)
      if (res.status === 200) {
        await onVerify()
        return
      }

      throw new Error('Error validando códigos')
    } catch (error) {
      setInvalidCodes(true)
    } finally {
      setIsSubmiting(false)
    }
  }

  return (
    <Modal show={show} size='sm'>
      <ModalHeader title='Verificación de códigos' />
      <ModalBody>
        <p className='text-gray-600 mb-5'>
          Hemos enviado códigos de verificación a tu correo electrónico y celular para comprobar que
          tienes acceso
        </p>
        <Form<OTPValues, typeof schema> onSubmit={handleSubmit} schema={schema}>
          {({ register, formState }) => (
            <>
              <InputField
                label='Código enviado al correo'
                error={formState.errors.emailCode}
                registration={register('emailCode')}
                autoComplete='off'
              />
              <InputField
                label='Código enviado al celular'
                error={formState.errors.smsCode}
                registration={register('smsCode')}
                autoComplete='off'
              />

              {invalidCodes && (
                <Alert color='failure'>
                  <p>Los códigos ingresados son incorrectos, por favor compruebalos</p>
                </Alert>
              )}

              <div className='flex justify-end gap-2'>
                <Button color='light' onClick={() => onReject()}>
                  Volver
                </Button>
                <Button
                  type='submit'
                  variant='gradient'
                  isLoading={isSubmiting}
                  disabled={isSubmiting}
                >
                  Validar
                </Button>
              </div>
            </>
          )}
        </Form>
      </ModalBody>
    </Modal>
  )
}
