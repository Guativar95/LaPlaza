import { FC } from 'react'
import { BiEditAlt } from 'react-icons/bi'

import { LinkButton } from '@/components/ui/Button'
import { BASE_URL } from '@/config'
import { useAuth } from '@/lib/auth'

import { Vehicle } from '../../types'
import { QRButton } from '../QRButton'

export type DetailsHeaderProps = {
  vehicle: Pick<Vehicle, 'vehicleId' | 'brand' | 'line' | 'model' | 'licencePlate' | 'grossValue'>
  className?: string
  showActions?: boolean
}

export const DetailsHeader: FC<DetailsHeaderProps> = ({ vehicle, showActions }) => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <div className='flex justify-between items-start'>
        <p className='flex gap-2 text-xl'>
          <span>{vehicle.brand}</span>
          <span>{vehicle.line?.split(' ')[0]}</span>|<span>{vehicle.model}</span>
        </p>
        {isAuthenticated && showActions && (
          <div className='relative -top-2 flex gap-1'>
            <QRButton
              color='secondary'
              value={`${BASE_URL}/vehiculos/${vehicle.vehicleId}`}
              name={vehicle.line}
            />
            <LinkButton
              to={`/vehiculos/editar?licencePlate=${vehicle.licencePlate}`}
              color='secondary'
              variant='text'
              className='px-2'
              aria-label='Editar'
            >
              <BiEditAlt className='text-2xl' />
            </LinkButton>
          </div>
        )}
      </div>
    </>
  )
}
