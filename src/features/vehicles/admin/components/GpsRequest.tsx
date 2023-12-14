import { Vehicle } from '@vehicles/common/types'

import { InputField } from '@/components/Form'
import { LinkButton } from '@/components/ui/Button'

interface VehiclesListProps {
  vehicles: Vehicle[]
}

export const GpsRequest = ({ vehicles }: VehiclesListProps) => {
  return (
    <section className='grid gap-4 grid-cols-1  md:grid-cols-1 xl:grid-cols-1 '>
      <table className='mt-10 rounded-lg  my-5  border-spacing-2'>
        <thead>
          <tr className='font-bold text-xl mt-5  bg-purple-200 '>
            <td>Fecha Solicitud</td>
            <td>Placa</td>
            <td>Marca</td>
            <td>Estado</td>
            <td>Fecha Agendamiento</td>
            <td className='text-left px-6'>Observación</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((dato) => (
            <tr key={dato.vehicleId} className='shadow-md'>
              <td>{dato.dateEntry}</td>
              <td>{dato.licencePlate}</td>
              <td>{dato.brand}</td>
              <td>{dato.statusVehicle}</td>
              <td>{dato.dateEntry}</td>
              <td>
                <InputField className='w-min' type='text' />
              </td>
              <td className='w-10'>
                <LinkButton variant='gradient' to={`/vehiculos/${dato.vehicleId}`} className='!p-1'>
                  Gestionar
                </LinkButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
