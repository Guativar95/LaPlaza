import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Request, RequestTypes } from '@vehicles/common'
import { StatusVehicle } from '@vehicles/common/types'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { createRequest } from '../api/createRequest'

import { SimpleObservationForm, SimpleObservationValues } from './SimpleObservationForm'

export type EnlistmentModalProps = {
  showEnlistment: boolean
  vehicleId: string
  onClose: () => void
  onSuccess?: () => void
}

export const EnlistmentModal: React.FC<EnlistmentModalProps> = ({
  showEnlistment,
  onClose,
  vehicleId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async ({ description, providerId }: SimpleObservationValues) => {
    setIsLoading(true)
    const request: Request = {
      vehicleId,
      statusVehicleId: StatusVehicle.inEnlistment,
      typeRequestId: RequestTypes.enlistment,
      statusRequestId: StatusVehicle.pending,
      providerId,
      detailRequests: [
        {
          description,
          observations: [],
        },
      ],
    }
    try {
      const { status } = await createRequest(request)
      if (status === 200) {
        onClose()
        onSuccess && onSuccess()
        toast.success('Solicitud de Alistamiento creada')
      }
    } catch (error) {
      console.error(error)
      toast.error('Hemos tenido problemas creando la solicitud')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal show={showEnlistment} size='lg'>
      <ModalHeader title='Datos de la solicitud Alistamiento' onClose={onClose} />
      <ModalBody>
        <SimpleObservationForm
          onSuccess={handleSubmit}
          requestType={RequestTypes.enlistment}
          isLoading={isLoading}
        />
      </ModalBody>
    </Modal>
  )
}
