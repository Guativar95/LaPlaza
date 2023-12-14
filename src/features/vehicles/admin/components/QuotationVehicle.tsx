import { Vehicle } from '@vehicles/common/types'

import { LinkButton } from '@/components/ui/Button'

interface VehiclesListProps {
  vehicles: Vehicle[]
}

export const QuotationVehicle = ({ vehicles }: VehiclesListProps) => {
  return (
    <section className='grid gap-16 grid-cols-1 max-w-full md:grid-cols-1 xl:grid-cols-1 '>
      <table className='mt-10 mx-auto space-x-4 rounded-lg w-4/6 my-5  border-spacing-2 border-2  '>
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
              <td className='w-64'>{dato.dateEntry}</td>
              <td className='w-36'>{dato.licencePlate}</td>
              <td className='w-36'>{dato.brand}</td>
              <td className='w-64 '>{dato.description}</td>
              <td className='w-10'>
                <LinkButton variant='gradient' to={`/admin/${dato.vehicleId}`} className='!p-1'>
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
