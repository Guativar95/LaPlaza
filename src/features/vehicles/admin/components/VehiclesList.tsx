import { Vehicle } from '@vehicles/common/types'

import { LinkButton } from '@/components/ui/Button'

interface VehiclesListProps {
  vehicles: Vehicle[]
}

export const VehiclesList = ({ vehicles }: VehiclesListProps) => {
  return (
    <table className='space-x-4 rounded-lg my-5 border-spacing-2 border-2 w-full'>
      <thead>
        <tr className='from-transparent font-bold text-xl via-transparent my-3 rounded-lg  bg-purple-200 border-2'>
          <td>Fecha Ingreso</td>
          <td>Placa</td>
          <td>Marca</td>
          <td>Estado</td>
          <td>Accion</td>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((dato) => (
          <tr className='shadow-md   rounded-l-lg ' key={dato.vehicleId}>
            <td className='w-64'>
              {dato.dateEntry ? new Date(dato.dateEntry).toLocaleDateString() : ''}
            </td>
            <td className='w-36'>{dato.licencePlate}</td>
            <td className='w-36'>{dato.brand}</td>
            <td className='w-64 '>{dato.statusVehicle}</td>
            <td className='w-10'>
              <LinkButton variant='gradient' to={`/vehiculos/${dato.vehicleId}`} className='!p-1'>
                Gestionar
              </LinkButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
