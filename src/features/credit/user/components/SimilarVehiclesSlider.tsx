import React, { useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { VehicleItem } from '@vehicles/common/components/VehicleItem'
import { Vehicle } from '@vehicles/common/types'

import { Button } from '@/components/ui/Button'

import { SimilarVehicleDetailsModal } from './SimilarVehicleDetailsModal'

export type SimilarVehiclesSliderProps = {
  vehicles: Vehicle[]
}

export const SimilarVehiclesSlider: React.FC<SimilarVehiclesSliderProps> = ({ vehicles }) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState('')
  const closeVehicleDetails = () => setSelectedVehicleId('')

  const scrollImagesRef = useRef<HTMLDivElement>(null)

  const scrollTo = (to: 'right' | 'left') => {
    const el = scrollImagesRef.current
    if (!el) return

    const scrollWith = {
      left: -el.clientWidth,
      right: el.clientWidth,
    }

    el.scrollTo({ left: el.scrollLeft + scrollWith[to] })
  }

  return (
    <>
      <div className='relative rounded-xl overflow-hidden'>
        {vehicles.length > 0 && (
          <>
            <div className='absolute h-full top-0 left-0 px-1 md:px-2 flex justify-center items-center z-10 pointer-events-none'>
              <button
                className='p-2 rounded-full hover:bg-gray-500/50 pointer-events-auto'
                onClick={() => scrollTo('left')}
              >
                <FiChevronLeft className='text-white text-3xl' />
              </button>
            </div>
            <div className='absolute h-full top-0 right-0 px-1 md:px-2 flex justify-center items-center z-10 pointer-events-none'>
              <button
                className='p-2 rounded-full hover:bg-gray-500/50 pointer-events-auto'
                onClick={() => scrollTo('right')}
              >
                <FiChevronRight className='text-white text-3xl' />
              </button>
            </div>
          </>
        )}
        <div
          className='flex gap-3 w-full py-5 snap-x overflow-x-auto scroll-smooth md:no-scrollbar'
          ref={scrollImagesRef}
        >
          {vehicles.length === 0 && (
            <div className='w-full text-center italic text-gray-600'>No hay resultados</div>
          )}
          {vehicles.map(
            ({
              brand,
              licencePlate,
              line,
              mileage,
              model,
              vehicleId,
              routeImageMain,
              grossValue,
              licencePlatePair,
              typeTransmission,
              monthlyFee,
              statusVehicleId,
            }) => (
              <VehicleItem
                key={vehicleId}
                showEditButton={false}
                className='min-w-full md:min-w-[25rem]'
                vehicle={{
                  brand,
                  fee: monthlyFee,
                  licencePlate,
                  line,
                  mileage,
                  model,
                  vehicleId,
                  routeImageMain,
                  licencePlatePair,
                  value: grossValue,
                  typeTransmission,
                  statusVehicleId,
                }}
                renderDetailsButton={({ vehicleId }) => (
                  <Button
                    variant='gradient'
                    className='py-1'
                    onClick={() => setSelectedVehicleId(vehicleId)}
                  >
                    Ver detalles
                  </Button>
                )}
              />
            )
          )}
        </div>
      </div>
      {selectedVehicleId && (
        <SimilarVehicleDetailsModal vehicleId={selectedVehicleId} onClose={closeVehicleDetails} />
      )}
    </>
  )
}
