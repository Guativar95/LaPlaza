import { FC } from 'react'
import { toast } from 'react-toastify'
import { updateRequest } from '@vehicles/common/api/updateRequest'
import { RequestResponse, StatusVehicle } from '@vehicles/common/types'

import { ModalConfirm } from '@/components/ui/Modal'

export type ConfirmServiceModalProps = {
  show: boolean
  onClose: () => void
  request: RequestResponse
  onSuccess?: () => void
}

export const ConfirmServiceModal: FC<ConfirmServiceModalProps> = ({
  show,
  onClose,
  request,
  onSuccess,
}) => {
  const onAccept = async () => {
    try {
      const { status, statusText } = await updateRequest({
        ...request,
        statusRequestId: StatusVehicle.completed,
      })

      if (status === 200) {
        toast.success('Solicitud confirmada')
        onClose()
        onSuccess && onSuccess()
        return
      }

      throw new Error(statusText)
    } catch (error) {
      console.error(error)
      toast.error('Hemos tenido problemas confirmando la solicitud')
    }
  }

  return (
    <ModalConfirm
      show={show}
      title='¿Está seguro de confirmar este servicio?'
      onReject={onClose}
      onAccept={onAccept}
    />
  )
}
