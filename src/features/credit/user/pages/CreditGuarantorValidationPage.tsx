import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LinkButton } from '@/components/ui/Button'
import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { continueRegisterGuarantor } from '../api/continueRegisterGuarantor'
import { EvidenteForm, EvidenteValues } from '../components/ApplicationForms/EvidenteForm'
import { useApplicationContext } from '../store/ApplicationContext'

export const CreditGuarantorValidationPage = () => {
  const { application, verificationData } = useApplicationContext()
  const { guarantorId } = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (values: EvidenteValues) => {
    const { questionnaireId, questionnaireReg } = verificationData
    setIsSubmitting(true)
    try {
      const { status, statusText } = await continueRegisterGuarantor({
        questionnaireId,
        questionnaireReg: String(questionnaireReg),
        answers: values.questions.map((answer) => answer),
        requestCode: application.id,
        guarantorId: Number(guarantorId),
      })

      if (status === 200) {
        setIsSubmitted(true)
        return
      }

      throw new Error(statusText)
    } catch (error) {
      toast.error('Hemos tenido problemas verificando tu identidad')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {isSubmitted ? (
        <Modal show>
          <ModalBody>
            <h2 className='text-2xl text-secondary font-bold'>Registro de avalista exitoso</h2>
            <div className='flex justify-end mt-5'>
              <LinkButton to='/inicio' replace variant='gradient'>
                Ir al inicio
              </LinkButton>
            </div>
          </ModalBody>
        </Modal>
      ) : (
        <Modal show>
          <ModalBody>
            <ModalHeader title='Antes de continuar, necesitamos verificar tu identidad' />
            <EvidenteForm
              questions={verificationData.questions}
              onSuccess={handleSubmit}
              isLoading={isSubmitting}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  )
}
