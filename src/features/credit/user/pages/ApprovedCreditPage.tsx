import { useState } from 'react'
import { toast } from 'react-toastify'

import { LinkButton } from '@/components/ui/Button'
import { Modal, ModalBody } from '@/components/ui/Modal'

import { CreditLayout } from '../../common'
import { completeApplicantInfo } from '../api/completeApplicantInfo'
import { updateTermAndFee } from '../api/updateApplication'
import { ExtraCreditFields, ExtraFieldForm } from '../components/ApplicationForms/ExtraFieldsForm'
import { useApplicationContext } from '../store/ApplicationContext'

export const ApprovedCreditPage = () => {
  const { application } = useApplicationContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSuccess = async (values: ExtraCreditFields) => {
    const { creditSelection, ...applicant } = values
    const requestCode = application.id

    setIsSubmitting(true)
    setIsSubmitted(false)

    try {
      await updateTermAndFee({
        requestCode,
        ...creditSelection,
      })

      await completeApplicantInfo({
        requestCode,
        ...applicant,
      })

      setIsSubmitted(true)
    } catch (error) {
      toast.error('A ocurrido un error, por favor vuelve a intentar o comunicate con un asesor')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CreditLayout title='Crédito aprobado'>
      <ExtraFieldForm onSuccess={handleSuccess} isLoading={isSubmitting} />

      {isSubmitted && (
        <Modal show>
          <ModalBody>
            <h2 className='text-3xl text-secondary font-bold mb-3'>Ya casi es tuyo</h2>
            <p className='text-lg'>
              Tu solicitud fue aprobada correctamente, vas a recibir un correo para continuar con el
              proceso de firma digital
            </p>
            <div className='flex justify-end mt-5'>
              <LinkButton to='/' replace variant='text'>
                Ir al inicio
              </LinkButton>
            </div>
          </ModalBody>
        </Modal>
      )}
    </CreditLayout>
  )
}
