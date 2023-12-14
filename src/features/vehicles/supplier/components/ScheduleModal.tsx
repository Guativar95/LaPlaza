import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { RequestResponse, StatusVehicle } from '@vehicles/common'
import { updateRequest } from '@vehicles/common/api/updateRequest'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { ScheduleForm, ScheduleValues } from './ScheduleForm'

export type ScheduleModalProps = {
  show: boolean
  onClose: () => void
  request: RequestResponse & {
    statusRequestId: StatusVehicle.scheduled | StatusVehicle.agendaQuotation
  }
  onSuccess?: () => void
}

export const ScheduleModal: FC<ScheduleModalProps> = ({ show, onClose, request, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (values: ScheduleValues) => {
    setIsLoading(true)
    const { scheduledDate, location, observation, typeVisitId } = values
    try {
      const { status, statusText } = await updateRequest({
        ...request,
        location,
        typeVisitId,
        scheduledDate,
        scheduledDescription: observation,
      })

      if (status === 200) {
        toast.success('Solicitud agendada')
        onClose()
        onSuccess && onSuccess()
        return
      }

      throw new Error(statusText)
    } catch (error) {
      console.error(error)
      toast.error('Hemos tenido problemas agendando la solicitud')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal show={show}>
      <ModalHeader title='Agendar alistamiento' onClose={onClose} />
      <ModalBody>
        <div className='w-96'>
          <ScheduleForm onSuccess={handleSubmit} isLoading={isLoading} />
        </div>
      </ModalBody>
    </Modal>
  )
}
