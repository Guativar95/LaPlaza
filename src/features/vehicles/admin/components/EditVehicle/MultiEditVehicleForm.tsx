import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { ColserautoValue, Vehicle } from '@/features/vehicles/common'
import { getColserautoValuesByVehicleId } from '@/features/vehicles/common/api/getColserautoValues'

import { ColserautoForm } from '../ColserautoForm'
import { ManageVehicleImages } from '../ManageVehicleImages'

import { EditForm } from './EditForm'

export type StepEditVehicleProps = {
  vehicle: Vehicle
}

export const MultiEditVehicleForm: FC<StepEditVehicleProps> = ({ vehicle }) => {
  const [colserautoValues, setColserautoValues] = useState<ColserautoValue[]>([])

  const fetchColserautoValues = async () => {
    const res = await getColserautoValuesByVehicleId(vehicle.vehicleId)
    setColserautoValues(res.data)
  }

  const tabClassName = (selected: boolean) =>
    clsx(
      'w-full py-2.5 font-medium leading-5 text-primary font-bold',
      'border-b-2 border-b-gray-100 hover:border-b-2 hover:border-b-gray-300',
      selected
        ? 'border-b-2 !border-b-primary text-primary hover:border-b-primary'
        : 'text-gray-700'
    )

  useEffect(() => {
    fetchColserautoValues()
  }, [vehicle.vehicleId])

  return (
    <>
      <Tab.Group>
        <Tab.List className='flex '>
          <Tab className={({ selected }) => tabClassName(selected)}>Datos básicos</Tab>
          <Tab className={({ selected }) => tabClassName(selected)}>Datos colserauto</Tab>
          <Tab className={({ selected }) => tabClassName(selected)}>Imágenes</Tab>
        </Tab.List>
        <Tab.Panels className='mt-5'>
          <Tab.Panel>
            <EditForm initialValues={vehicle} />
          </Tab.Panel>
          <Tab.Panel>
            <ColserautoForm
              onSuccess={() => {
                toast.success('Datos colserauto actualizados')
                fetchColserautoValues()
              }}
              vehicleId={vehicle.vehicleId}
              defaultValues={colserautoValues}
            />
          </Tab.Panel>
          <Tab.Panel>
            <ManageVehicleImages vehicleId={vehicle.vehicleId} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}
