import { useCallback, useState } from 'react'
import { IoMdAlert } from 'react-icons/io'
import { toast } from 'react-toastify'
import { Alert } from 'flowbite-react'
import { z } from 'zod'

import { Form, InputField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { Modal, ModalFooter, ModalHeader } from '@/components/ui/Modal'
import { ModalBody } from '@/components/ui/Modal/ModalBody'

import { updateApplicantReview } from '../../../api/updateApplicantEmail'

const schema = z.object({
  email: z.string().min(1, 'Campo requerido').email('El correo no es valido'),
})

type ReviewNeededValues = {
  email: string
}

export interface ReviewNeededStepProps {
  applicationCode: string
  vehicleId?: string
  guarantorId?: number
}

export const ReviewNeededStep = ({
  applicationCode,
  vehicleId,
  guarantorId,
}: ReviewNeededStepProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [show, setShow] = useState(false)

  const saveEmail = useCallback(async ({ email }: ReviewNeededValues) => {
    setIsSubmitting(true)

    try {
      await updateApplicantReview({
        email,
        requestCode: applicationCode,
        vehicleId,
        guarantorId,
      })

      setShow(true)
      setIsSubmitted(true)
    } catch (error) {
      toast.error('Error guardando correo, por favor vuelva a intentar')
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  return (
    <>
      <div role='alert' className='mb-4'>
        <Alert icon={() => <IoMdAlert className='hidden text-4xl mr-4 md:block' />}>
          <h2 className='text-lg mb-2'>No pudimos completar la verificación</h2>
          <p>
            Alguien de nuestro equipo va a hacer la verificación manual, esto puede tardar hasta dos
            días habiles.
          </p>
        </Alert>
      </div>
      <p>
        Queremos tu correo electronico para enviar el resultado de la verificación y continues con
        el proceso para adquirir tu vehículo
      </p>
      <Form<ReviewNeededValues, typeof schema>
        schema={schema}
        onSubmit={saveEmail}
        options={{ mode: 'all' }}
      >
        {({ register, formState }) => (
          <div className='flex flex-col gap-3 mt-2 md:flex-row md:items-start'>
            <div className='flex-1'>
              <InputField
                aria-label='Correo electronico'
                type='email'
                className='mt-0'
                placeholder='pepito@ejemplo.com'
                error={formState.errors.email}
                registration={register('email')}
              />
            </div>
            <Button type='submit' isLoading={isSubmitting} disabled={isSubmitting || isSubmitted}>
              Guardar
            </Button>
          </div>
        )}
      </Form>

      {show && (
        <Modal show={show}>
          <ModalHeader title='Eso es todo :)' />
          <ModalBody>
            Te vamos a enviar un correo con el resultado de la verificación para que continues con
            el proceso
          </ModalBody>
          <ModalFooter>
            <div className='w-full flex justify-end'>
              <Button onClick={() => setShow(false)} color='light'>
                Cerrar
              </Button>
            </div>
          </ModalFooter>
        </Modal>
      )}
    </>
  )
}
