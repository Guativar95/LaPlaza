import { VehicleItem } from '@vehicles/common/components/VehicleItem'
import { Vehicle } from '@vehicles/common/types'

interface VehiclesListProps {
  vehicles: Vehicle[]
}

export const VehiclesList = ({ vehicles }: VehiclesListProps) => {
  return (
    <section className='grid gap-16 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
      {vehicles.map(
        ({
          vehicleId,
          brand,
          line,
          model,
          mileage,
          routeImageMain,
          licencePlate,
          typeTransmission,
          licencePlatePair,
          grossValue,
          monthlyFee,
          statusVehicleId,
        }) => (
          <VehicleItem
            key={vehicleId}
            vehicle={{
              vehicleId,
              brand,
              line,
              model,
              mileage,
              routeImageMain,
              licencePlate,
              fee: monthlyFee,
              value: grossValue,
              typeTransmission,
              licencePlatePair,
              statusVehicleId,
            }}
          />
        )
      )}
    </section>
  )
}
