import { useState } from 'react'
import { toast } from 'react-toastify'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { continueApplication } from '../api/continueApplication'
import { EvidenteForm, EvidenteValues } from '../components/ApplicationForms/EvidenteForm'
import { useApplicationContext } from '../store/ApplicationContext'

export const ApplicationValidationPage = () => {
  const { application, verificationData, handleApplicationResponse } = useApplicationContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: EvidenteValues) => {
    const { questionnaireId, questionnaireReg } = verificationData
    setIsSubmitting(true)
    try {
      const { data } = await continueApplication({
        questionnaireId,
        questionnaireReg: String(questionnaireReg),
        answers: values.questions.map((answer) => answer),
        requestCode: application.id,
      })

      handleApplicationResponse(data)
    } catch (error) {
      toast.error('Hemos tenido problemas verificando tu identidad')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
  )
}
