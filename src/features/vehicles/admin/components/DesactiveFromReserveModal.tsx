import { FC, useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/Button'
import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { StatusVehicle } from '../../common'
import { updateVehicleStatus, vehicleStatus } from '../api/updateVehicleStatus'

export type DesactiveFromReserveModalProps = {
  show: boolean
  vehicleId: string
  onClose: () => void
  onSuccess?: () => void
}

export const DesactiveFromReserveModal: FC<DesactiveFromReserveModalProps> = ({
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
      statusVehicleId: StatusVehicle.available,
    }
    try {
      const { status } = await updateVehicleStatus(request)
      if (status === 200) {
        onClose()
        onSuccess && onSuccess()
        toast.success('Vehículo no reservado')
      }
    } catch (error) {
      console.error(error)
      toast.error('Hemos tenido problemas cambiando el estado del vehículo')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal show={show} size='lg' onClose={onClose}>
      <ModalHeader onClose={onClose} />
      <ModalBody>
        <p className='text-lg  text-primary-700 font-bold'>
          ¿Esta seguro que desea desactivar el vehículo reservado?
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
