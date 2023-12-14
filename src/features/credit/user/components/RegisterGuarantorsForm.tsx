import React, { ChangeEvent, useState } from 'react'
import { DefaultValues } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Form, InputField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { Modal, ModalHeader } from '@/components/ui/Modal'
import { ModalBody } from '@/components/ui/Modal/ModalBody'

import { addGuarantor } from '../api/addGuarantor'

export type RegisterGuarantorsFormValues = {
  name: string
  phoneNumber: string
  email: string
}

export type RegisterGuarantorsFormProps = {
  disableGoBack?: boolean
  onRegisterAnyone?: () => void
  defaultValues?: DefaultValues<RegisterGuarantorsFormValues>
  readonly?: boolean
}

export const RegisterGuarantorsForm: React.FC<RegisterGuarantorsFormProps> = ({
  disableGoBack,
  onRegisterAnyone,
  defaultValues,
  readonly,
}) => {
  const { applicationId = '' } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showCreated, setShowCreated] = useState(false)

  const onSubmit = async (values: RegisterGuarantorsFormValues) => {
    setIsSubmitting(true)
    try {
      const { status } = await addGuarantor({
        ...values,
        code: applicationId,
      })

      if (status === 200) {
        onRegisterAnyone && onRegisterAnyone()
        setIsSubmitted(true)
        setShowCreated(true)
      }
    } catch (error) {
      toast.error('Hemos tenido problemas registrando al avalista')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Form<RegisterGuarantorsFormValues, typeof schema>
        schema={schema}
        onSubmit={onSubmit}
        options={{ defaultValues }}
      >
        {({ register, formState: { errors } }) => (
          <div>
            <InputField
              label='Nombre'
              registration={register('name')}
              error={errors.name}
              disabled={readonly}
            />
            <div className='grid md:grid-cols-2 md:gap-3'>
              <InputField
                label='Teléfono'
                registration={register('phoneNumber', {
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    const { value = '' } = e.target
                    e.target.value = value.replace(/[^\d]/, '')
                  },
                })}
                error={errors.phoneNumber}
                maxLength={10}
                disabled={readonly}
              />
              <InputField
                type='email'
                label='Correo'
                registration={register('email')}
                error={errors.email}
                disabled={readonly}
              />
            </div>
            {!readonly && (
              <div className='flex justify-end mt-3'>
                <Button
                  type='submit'
                  isLoading={isSubmitting}
                  disabled={isSubmitted || disableGoBack}
                >
                  {isSubmitted ? 'Registrado' : 'Registrar'}
                </Button>
              </div>
            )}
          </div>
        )}
      </Form>
      {showCreated && (
        <Modal show={showCreated}>
          <ModalHeader title='Listo' />
          <ModalBody>
            <p>
              Se envío un link al avalista para que se registre, tu recibirás un correo para que
              continúes el proceso
            </p>
            <div className='flex justify-end mt-5'>
              <Button color='light' onClick={() => setShowCreated(false)}>
                Cerrar
              </Button>
            </div>
          </ModalBody>
        </Modal>
      )}
    </>
  )
}

const schema = z.object({
  name: z.string().min(1, 'Campo requerido'),
  phoneNumber: z.string().min(1, 'Campo requerido'),
  email: z.string().min(1, 'Campo requerido').email('Debe ser un correo valido'),
})
