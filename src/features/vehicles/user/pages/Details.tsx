import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getColserautoValuesByVehicleId } from '@vehicles/common/api/getColserautoValues'
import { getVehicleById } from '@vehicles/common/api/getVehicle'
import { DetailsHeader } from '@vehicles/common/components/Details/DetailsHeader'
import { FeeSimulator, FeeSimulatorValues } from '@vehicles/common/components/Details/FeeSimulator'
import { VehicleProperties } from '@vehicles/common/components/Details/VehicleProperties'
import { DetailsGallery } from '@vehicles/common/components/DetailsGallery'
import { ColserautoValue, StatusVehicle, Vehicle } from '@vehicles/common/types'

import { MainLayout } from '@/components/Layout'
import { Card } from '@/components/ui/Card'
import { normalizeText } from '@/utils/format'
import storage from '@/utils/storage'

import { VehicleScore } from '../components/VehicleScore'

const scoreProperties = [
  { key: 'Latonería' },
  { key: 'Pintura' },
  { key: 'Vidrios' },
  { key: 'Chasis' },
  { key: 'Tapicería' },
  { key: 'Fugas de fluidos' },
]

export const Details = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [vehicle, setVehicle] = useState({} as Vehicle)
  const [isLoading, setIsLoading] = useState(true)
  const [colserautoValues, setColserautoValues] = useState([] as ColserautoValue[])

  const { brand, grossValue, model, licencePlate, line, initialFee, vehicleId } = vehicle

  const onContinue = (values: FeeSimulatorValues) => {
    storage.setCreditValues(values)
    navigate(`/creditos/nueva-solicitud/${vehicleId}`)
  }

  const getDetails = async (id: string) => {
    try {
      const [vehicle, colserautoValues] = await Promise.all([
        getVehicleById(id),
        getColserautoValuesByVehicleId(id),
      ])

      setVehicle(vehicle.data)
      setColserautoValues(colserautoValues.data)
      setIsLoading(false)
    } catch (error: any) {
      const status = error?.response?.status as number
      if (status === 400) {
        navigate('/vehiculos', { replace: true })
        return
      }

      toast.error('Hemos tenido problemas obteniendo los datos')
    }
  }

  const score = useMemo(() => {
    let scoreCount = 0
    let scoreSum = 0
    scoreProperties.forEach(({ key }) => {
      const colserautoValue = colserautoValues.find(
        (col) => normalizeText(col.name) === normalizeText(key)
      )
      let valueAsNumber = 0
      if (colserautoValue?.actual) {
        valueAsNumber = +colserautoValue.actual
      } else {
        valueAsNumber = colserautoValue?.value ? +colserautoValue.value : 0
      }
      scoreSum += valueAsNumber
      scoreCount++
    })

    return scoreSum / (scoreCount || 1)
  }, [colserautoValues])

  useEffect(() => {
    if (!id) {
      return
    }
    getDetails(id)
  }, [])

  return (
    <MainLayout title='Detalles del vehículo' isLoading={isLoading}>
      <input type='hidden' id='IMPEL_LICENCE_PLATE' value={vehicle.licencePlate} />
      <div className='flex flex-col gap-16 lg:flex-row lg:items-start'>
        <section className='w-full flex flex-col gap-7'>
          <DetailsGallery vehicleId={vehicleId} />
          <VehicleProperties vehicle={vehicle} colserautoValues={colserautoValues} />
        </section>
        <section className='w-full lg:max-w-md'>
          <Card className='rounded-bl-none rounded-br-none shadow-lg'>
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
          <Card className='mt-16 rounded-tl-none rounded-tr-none shadow-lg'>
            <FeeSimulator
              onSuccess={onContinue}
              vehicle={{
                vehicleId,
                grossValue,
                initialFee,
              }}
              readonly={vehicle.statusVehicleId !== StatusVehicle.inShowcase}
            />
          </Card>
          <Card className='mt-8 rounded-tl-none rounded-tr-none shadow-lg'>
            <VehicleScore score={score} />
          </Card>
        </section>
      </div>
    </MainLayout>
  )
}
