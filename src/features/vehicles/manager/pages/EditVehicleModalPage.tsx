import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getVehicleById } from '@vehicles/common/api/getVehicle'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'

import { updateVehicle } from '../../admin/api/updateVehicle'
import { Vehicle } from '../../common'
import { SimpleNumericValues } from '../../common/components/SimpleNumericForm'
import { GrossValueForm } from '../components/GrossValueForm'

export const EditVehicleModalPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [vehicle, setVehicle] = useState<Vehicle>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = () => navigate(-1)
  const handleSuccess = async (values: SimpleNumericValues) => {
    if (!vehicle) return

    setIsSubmitting(true)
    try {
      const { status, statusText } = await updateVehicle({
        vehicleId: vehicle.vehicleId,
        grossValue: values.value,
      })

      if (status === 200) {
        toast.success('Valor bruto actualizado')
      } else {
        throw new Error(statusText)
      }
    } catch (error) {
      toast.error('No se ha podido actualizar el valor bruto')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    getVehicleById(id!)
      .then(({ data }) => setVehicle(data))
      .catch(() => toast.error('Hemos tenido problemas consultando el vehículo'))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      <Modal show onClose={handleClose}>
        <ModalHeader title='Actualizar valor bruto del vehículo' onClose={handleClose} />
        <ModalBody>
          <div className='w-96'>
            {isLoading && <Spinner className='mx-auto' />}
            {vehicle && (
              <GrossValueForm
                defaultValues={{ grossValue: vehicle.grossValue }}
                onSuccess={handleSuccess}
                isLoading={isSubmitting}
              />
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}
