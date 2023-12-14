import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { StatusVehicle } from '@vehicles/common'

import { Button } from '@/components/ui/Button'
import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { updateVehicleStatus, vehicleStatus } from '../api/updateVehicleStatus'

export type ReserverModalProps = {
  show: boolean
  vehicleId: string
  onClose: () => void
  onSuccess?: () => void
}

export const ReserverModal: React.FC<ReserverModalProps> = ({
  show,
  onClose,
  vehicleId,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async () => {
    setIsLoading(true)
    const request: vehicleStatus = {
      vehicleId,
      statusVehicleId: StatusVehicle.reserved,
    }
    try {
      const { status } = await updateVehicleStatus(request)
      if (status === 200) {
        onClose()
        onSuccess && onSuccess()
        toast.success('Vehículo Reservado')
      }
    } catch (error) {
      console.error(error)
      toast.error('Hemos tenido problemas al enviar el valor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal show={show} size='lg' onClose={onClose}>
      <ModalHeader onClose={onClose} />
      <ModalBody>
        <p className='text-lg  text-primary-700 font-bold'>
          ¿Esta seguro que desea reservar el vehículo?
        </p>
        <div className='flex justify-center'>
          <Button
            variant='gradient'
            isLoading={isLoading}
            disabled={isLoading}
            onClick={() => handleSubmit()}
            className='w-32 mt-5'
          >
            Sí
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}
