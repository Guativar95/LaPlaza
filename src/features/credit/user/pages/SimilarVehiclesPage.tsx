import { useEffect, useState } from 'react'
import { BsChevronLeft } from 'react-icons/bs'
import { useNavigate, useParams } from 'react-router-dom'
import { getVehicleById } from '@vehicles/common/api/getVehicle'
import { getVehiclesByFilters } from '@vehicles/common/api/getVehicles'
import { StatusVehicle, Vehicle } from '@vehicles/common/types'

import { CreditLayout } from '../../common/components/CreditLayout'
import { SimilarVehiclesSlider } from '../components/SimilarVehiclesSlider'

export const SimilarVehiclesPage = () => {
  const navigate = useNavigate()

  const { vehicleId } = useParams()

  const [similarCharacteristics, setSimilarCharacteristics] = useState<Vehicle[]>([])
  const [lowerFee, setLowerFee] = useState<Vehicle[]>([])

  const getSimilarVehicles = async (vehicle: Vehicle) => {
    try {
      const commonParams = {
        statusVehicleId: StatusVehicle.inShowcase,
        vehicleIdExclude: vehicleId,
      }
      const [similarCharacteristicsResponse, lowerFeeResponse] = await Promise.all([
        getVehiclesByFilters({
          BrandId: vehicle.brandId,
          TypeBodyworkId: vehicle.typeBodyworkId,
          PriceMax: vehicle.grossValue,
          ...commonParams,
        }),
        getVehiclesByFilters({
          PriceMax: vehicle.grossValue,
          ...commonParams,
        }),
      ])

      setSimilarCharacteristics(similarCharacteristicsResponse.data.data)
      setLowerFee(lowerFeeResponse.data.data)
    } catch (error) {}
  }

  useEffect(() => {
    ;(async () => {
      const res = await getVehicleById(vehicleId!)
      getSimilarVehicles(res.data)
    })()
  }, [])

  return (
    <CreditLayout title='Otra opciones'>
      <button
        color='light'
        className='my-5 flex items-center gap-1 text-primary py-2 hover:opacity-80'
        onClick={() => navigate(-1)}
      >
        <BsChevronLeft className='inline' />
        Volver
      </button>
      <div>
        <div>
          <h2 className='text-xl text-secondary font-semibold'>Vehículos similares</h2>
          <SimilarVehiclesSlider vehicles={similarCharacteristics} />
        </div>
        <div>
          <h2 className='text-xl text-secondary font-semibold'>También podría interesarte</h2>
          <SimilarVehiclesSlider vehicles={lowerFee} />
        </div>
      </div>
    </CreditLayout>
  )
}
