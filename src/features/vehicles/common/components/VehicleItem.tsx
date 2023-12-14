import { ReactElement } from 'react'
import { BiEdit } from 'react-icons/bi'
import clsx from 'clsx'

import { LinkButton } from '@/components/ui/Button'
import { Role } from '@/features/auth'
import { useAuth } from '@/lib/auth'
import { formatCurrency, formatMileage } from '@/utils/format'

import notAvaliable from '../assets/images/image-not-avaliable.svg'
import reserved from '../assets/images/reserved.jpg'
import { VehiclePreview } from '../types'

interface VehicleItemProps {
  vehicle: VehiclePreview
  className?: string
  showEditButton?: boolean
  showDetailsButton?: boolean
  renderEditButton?: (vehicle: VehiclePreview) => ReactElement
  renderDetailsButton?: (vehicle: VehiclePreview) => ReactElement
}

export const VehicleItem = ({
  vehicle,
  className,
  showDetailsButton = true,
  showEditButton = true,
  renderDetailsButton,
  renderEditButton,
}: VehicleItemProps) => {
  const { user } = useAuth()
  const {
    vehicleId,
    brand,
    model,
    line,
    mileage,
    licencePlate,
    fee,
    routeImageMain,
    statusVehicleId,
  } = vehicle

  return (
    <article
      className={clsx('flex flex-col justify-between bg-white rounded-xl shadow-lg', className)}
    >
      <input type='hidden' value={licencePlate} id='IMPEL_LICENCE_PLATE' />
      <div className='h-72 md:h-60 rounded-t-xl overflow-hidden'>
        <figure className='h-full relative'>
          <img
            src={routeImageMain || notAvaliable}
            alt={`Vehículo ${line}`}
            className='h-full w-full object-cover object-center'
            loading='lazy'
            onError={(e: any) => (e.target.src = notAvaliable)}
          />
          {statusVehicleId === 9 && (
            <img className='absolute top-0 right-0 w-20 h-20 rounded-t-xl' src={reserved} />
          )}
        </figure>
      </div>
      <div className='p-4 flex justify-between'>
        <div>
          <div className='flex flex-wrap gap-1 text-lg font-semibold md:text-xl'>
            <h2 className='capitalize'>
              {brand.toLowerCase()} {line.split(' ')[0].toLowerCase()}
            </h2>
          </div>
          <span className='block text-gray-800 text-md md:text-lg mt-2'>
            {model}|{formatMileage(Number(mileage))} Km
          </span>
          <span className='block text-gray-800 text-md md:text-lg mt-2'>
            Cuota mensual: {formatCurrency(fee)}
          </span>
        </div>
        <div className='flex flex-col gap-1 justify-end'>
          {showDetailsButton &&
            (renderDetailsButton ? (
              renderDetailsButton(vehicle)
            ) : (
              <LinkButton variant='gradient' to={`/vehiculos/${vehicleId}`} className='!p-1'>
                Ver detalles
              </LinkButton>
            ))}
          {user?.roleName === Role.Administrator &&
            showEditButton &&
            (renderEditButton ? (
              renderEditButton(vehicle)
            ) : (
              <LinkButton
                variant='gradient'
                to={`/vehiculos/editar?licencePlate=${licencePlate}`}
                className='!p-1'
              >
                Editar
                <BiEdit className='inline ml-2' />
              </LinkButton>
            ))}
        </div>
      </div>
    </article>
  )
}
