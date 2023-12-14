import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Vehicle } from '@vehicles/common/types'
import { Alert } from 'flowbite-react'

import { MainLayout } from '@/components/Layout'
import { Card } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'
import { BASE_URL } from '@/config'

import { getVehiclesByFilters } from '../../common/api/getVehicles'
import { QRButton } from '../../common/components/QRButton'
import { MultiEditVehicleForm } from '../components/EditVehicle/MultiEditVehicleForm'
import { Search, SearchValues } from '../components/EditVehicle/Search'

export const Edit = () => {
  const mounted = useRef(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)

  const licencePlateFromParams = searchParams.get('licencePlate') || ''

  const searchVehicle = async ({ licencePlate }: SearchValues) => {
    if (licencePlate !== licencePlateFromParams) {
      setSearchParams({ licencePlate })
    }

    setIsLoading(true)
    setError('')
    setVehicle(null)

    try {
      const res = await getVehiclesByFilters({ licencePlate })
      const { count, data } = res.data

      if (count > 0) {
        setVehicle(data[0])
        return
      }

      setError(`No encontramos ningún vehículo con placa ${licencePlate}`)
    } catch (error) {
      setError('Hemos tenido problemas consultando el vehículo, vuelve a intentar')
    } finally {
      setIsLoading(false)
    }
  }

  const cleanSearch = () => {
    setSearchParams({})
  }

  useEffect(() => {
    if (mounted.current) {
      return
    }

    if (licencePlateFromParams) {
      searchVehicle({ licencePlate: licencePlateFromParams })
    }

    mounted.current = true
  }, [])

  useEffect(() => {
    if (!mounted.current) return

    if (!licencePlateFromParams) {
      setVehicle(null)
    }
  }, [licencePlateFromParams])

  return (
    <MainLayout title='Registro Vehicular'>
      <Card>
        <main className='container mx-auto px-4'>
          <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-semibold mb-5'>Editar datos vehículo</h1>
            {vehicle && (
              <div className='flex justify-end gap-1'>
                <QRButton
                  name={vehicle.line}
                  value={`${BASE_URL}/vehiculos/${vehicle.vehicleId}`}
                />
              </div>
            )}
          </div>

          <Search
            onSuccess={searchVehicle}
            onReset={cleanSearch}
            defaultValues={{ licencePlate: licencePlateFromParams }}
            isFound={Boolean(vehicle)}
            isLoading={isLoading}
          />

          {vehicle && (
            <>
              <hr className='my-5' />
              <MultiEditVehicleForm vehicle={vehicle} />
            </>
          )}

          {isLoading && (
            <div className='flex flex-col items-center py-4'>
              <Spinner />
              <span>Consultando vehículo...</span>
            </div>
          )}

          {error && (
            <div className='my-3'>
              <Alert color='failure' role='alert'>
                <span>{error}</span>
              </Alert>
            </div>
          )}
        </main>
      </Card>
    </MainLayout>
  )
}
