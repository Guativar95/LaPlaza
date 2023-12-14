import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Request, RequestTypes } from '@vehicles/common'
import { StatusVehicle } from '@vehicles/common/types'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { createRequest } from '../api/createRequest'

import { SimpleObservationForm, SimpleObservationValues } from './SimpleObservationForm'

export type CleaningModalProps = {
  showCleaning: boolean
  vehicleId: string
  onClose: () => void
  onSuccess?: () => void
}

export const CleaningModal: React.FC<CleaningModalProps> = ({
  showCleaning,
  onClose,
  vehicleId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async ({ description, providerId }: SimpleObservationValues) => {
    setIsLoading(true)
    const request: Request = {
      vehicleId,
      statusVehicleId: StatusVehicle.inCleaning,
      typeRequestId: RequestTypes.cleaning,
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
        toast.success('Solicitud de Limpieza creada')
      }
    } catch (error) {
      console.error(error)
      toast.error('Hemos tenido problemas creando la solicitud')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Modal show={showCleaning} size='lg'>
      <ModalHeader title='Datos de la solicitud Limpieza' onClose={onClose} />
      <ModalBody>
        <SimpleObservationForm
          onSuccess={handleSubmit}
          requestType={RequestTypes.cleaning}
          isLoading={isLoading}
        />
      </ModalBody>
    </Modal>
  )
}
