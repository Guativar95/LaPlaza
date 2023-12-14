import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Request, RequestTypes } from '@vehicles/common'
import { StatusVehicle } from '@vehicles/common/types'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { createRequest } from '../api/createRequest'

import { SimpleObservationForm, SimpleObservationValues } from './SimpleObservationForm'

export type GpsModalProps = {
  showGps: boolean
  vehicleId: string
  onClose: () => void
  onSuccess?: () => void
}

export const GpsModal: React.FC<GpsModalProps> = ({ onClose, vehicleId, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async ({ description, providerId }: SimpleObservationValues) => {
    setIsLoading(true)
    const request: Request = {
      vehicleId,
      statusVehicleId: StatusVehicle.installiGps,
      typeRequestId: RequestTypes.gps,
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
        toast.success('Solicitud de GPS creada')
      }
    } catch (error) {
      console.error(error)
      toast.error('Hemos tenido problemas creando la solicitud')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal show={true} size='lg'>
      <ModalHeader title='Datos de la solicitud Gps' onClose={onClose} />
      <ModalBody>
        <SimpleObservationForm
          onSuccess={handleSubmit}
          requestType={RequestTypes.gps}
          isLoading={isLoading}
        />
      </ModalBody>
    </Modal>
  )
}
