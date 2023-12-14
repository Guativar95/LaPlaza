import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getColserautoValuesByVehicleId } from '@vehicles/common/api/getColserautoValues'
import { getVehicleById } from '@vehicles/common/api/getVehicle'
import { DetailsHeader } from '@vehicles/common/components/Details/DetailsHeader'
import { FeeSimulator, FeeSimulatorValues } from '@vehicles/common/components/Details/FeeSimulator'
import { VehicleProperties } from '@vehicles/common/components/Details/VehicleProperties'
import { DetailsGallery } from '@vehicles/common/components/DetailsGallery'
import { ColserautoValue, Vehicle } from '@vehicles/common/types'

import { Card } from '@/components/ui/Card'
import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'
import { Spinner } from '@/components/ui/Spinner'
import storage from '@/utils/storage'

import { updateRequestedVehicle } from '../api/updateApplication'
import { useApplicationContext } from '../store/ApplicationContext'

export type SimilarVehicleDetailsModalProps = {
  vehicleId: string
  onClose: () => void
}

export const SimilarVehicleDetailsModal: FC<SimilarVehicleDetailsModalProps> = ({
  vehicleId: vehicleIdFromProps,
  onClose,
}) => {
  const [vehicle, setVehicle] = useState<Vehicle>({} as Vehicle)
  const [colserauto, setColserauto] = useState([] as ColserautoValue[])
  const { vehicleId, brand, grossValue, licencePlate, line, model, initialFee } = vehicle
  const { application, handleApplicationResponse } = useApplicationContext()

  const getVehicle = async () => {
    try {
      const [vehicleRes, colserautoRes] = await Promise.all([
        getVehicleById(vehicleIdFromProps),
        getColserautoValuesByVehicleId(vehicleIdFromProps),
      ])
      setVehicle(vehicleRes.data)
      setColserauto(colserautoRes.data)
    } catch (error) {}
  }

  const handleUpdate = async (creditValues: FeeSimulatorValues) => {
    storage.setCreditValues(creditValues)
    try {
      const { data } = await updateRequestedVehicle({
        newVehicleId: vehicleId,
        requestCode: application.id,
      })

      handleApplicationResponse({ ...data, vehicleId })
    } catch (error) {
      toast.error('Hemos problemas actualizando el vehículo')
    }
  }

  useEffect(() => {
    getVehicle()
  }, [])

  return (
    <Modal show={true} onClose={onClose} size='2xl'>
      <ModalHeader title='Detalles del vehículo' onClose={onClose} />
      <ModalBody>
        {!vehicle.vehicleId ? (
          <div className='flex gap-2 items-center justify-center my-5'>
            <Spinner />
            <p>Cargando datos del vehículo</p>
          </div>
        ) : (
          <div className='flex flex-col gap-5 lg:flex-row lg:items-start'>
            <section className='w-full flex flex-col gap-7'>
              <DetailsGallery vehicleId={vehicleId} />
              <VehicleProperties
                vehicle={vehicle}
                colserautoValues={colserauto}
                classNameTabHeader='shadow-md border border-gray-100'
                classNameTabContent='shadow-md border border-gray-100'
              />
            </section>
            <section className='w-full lg:max-w-md'>
              <Card className='shadow-md border border-gray-100'>
                <DetailsHeader
                  vehicle={{
                    vehicleId,
                    brand,
                    grossValue,
                    licencePlate,
                    line,
                    model,
                  }}
                />
              </Card>
              <Card className='shadow-md border border-gray-100 mt-10'>
                <FeeSimulator
                  onSuccess={handleUpdate}
                  vehicle={{
                    vehicleId,
                    grossValue,
                    initialFee,
                  }}
                />
              </Card>
            </section>
          </div>
        )}
      </ModalBody>
    </Modal>
  )
}
