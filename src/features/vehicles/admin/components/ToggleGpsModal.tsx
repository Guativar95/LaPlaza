import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { RequestTypes, StatusVehicle } from '../../common'
import { createRequest } from '../api/createRequest'

import { SimpleObservationForm, SimpleObservationValues } from './SimpleObservationForm'

export type ToggleGpsModalProps = {
  show: boolean
  vehicleId: string
  onClose: () => void
  onSuccess?: () => void
  requestType: RequestTypes.activeGPS | RequestTypes.inactiveGPS
  statusVehicle: StatusVehicle
}

export const ToggleGpsModal: React.FC<ToggleGpsModalProps> = ({
  show,
  onClose,
  vehicleId,
  onSuccess,
  requestType,
  statusVehicle,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values: SimpleObservationValues) => {
    setIsLoading(true)
    try {
      const { description, providerId } = values
      await createRequest({
        vehicleId,
        statusRequestId: StatusVehicle.pending,
        statusVehicleId: statusVehicle,
        typeRequestId: requestType,
        providerId,
        detailRequests: [{ description, observations: [] }],
      })

      onSuccess && onSuccess()
      toast.success(
        `Solicitud de ${
          requestType === RequestTypes.activeGPS ? 'activación' : 'desactivación'
        } de GPS creada`
      )
      onClose()
    } catch (error) {
      console.error(error)
      toast.error('Hemos tenido problemas creando la solicitud')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal show={show} size='lg' onClose={onClose}>
      <ModalHeader
        title={
          (requestType === RequestTypes.activeGPS ? 'Activación' : 'Desactivación') + ' de GPS'
        }
        onClose={onClose}
      />
      <ModalBody>
        <SimpleObservationForm
          onSuccess={handleSubmit}
          requestType={requestType}
          isLoading={isLoading}
        />
      </ModalBody>
    </Modal>
  )
}
