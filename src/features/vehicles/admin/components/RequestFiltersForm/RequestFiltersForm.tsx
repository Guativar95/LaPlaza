import { FC, useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { getStatus } from '@vehicles/common/api/vehicleSelects'

import { Form, InputField, Option, SelectField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { StatusVehicle } from '@/features/vehicles/common'
import { emptySelect } from '@/utils/defaults'

import { requestFiltersSchema, RequestFiltersValues } from './types'

export type RequestFiltersFormProps = {
  onSuccess: SubmitHandler<RequestFiltersValues>
  statusType?: 'all' | 'requests' | 'repairs' | 'vehicles' | 'gps'
}

export const RequestFiltersForm: FC<RequestFiltersFormProps> = ({
  onSuccess,
  statusType = 'all',
}) => {
  const [status, setStatus] = useState<Option[]>([])

  const getVehicleStatus = async () => {
    try {
      const { data } = await getStatus()
      const filteredStatus = data.filter((el) => {
        switch (statusType) {
          case 'requests':
            return [
              StatusVehicle.scheduled,
              StatusVehicle.pending,
              StatusVehicle.completed,
              StatusVehicle.rejected,
            ].includes(el.id)
          case 'repairs':
            return [
              StatusVehicle.scheduled,
              StatusVehicle.pending,
              StatusVehicle.completed,
              StatusVehicle.agendaQuotation,
              StatusVehicle.pendingQuotation,
              StatusVehicle.quoted,
              StatusVehicle.rejected,
            ].includes(el.id)
          case 'gps':
            return [StatusVehicle.pending, StatusVehicle.completed].includes(el.id)
          case 'vehicles':
            return [
              StatusVehicle.available,
              StatusVehicle.inCleaning,
              StatusVehicle.inEnlistment,
              StatusVehicle.inPreparation,
              StatusVehicle.inProcess,
              StatusVehicle.inShowcase,
              StatusVehicle.installiGps,
            ].includes(el.id)
          default:
            return true
        }
      })
      setStatus(filteredStatus.map(({ id, name }) => ({ label: name, value: id })))
    } catch (error) {}
  }

  useEffect(() => {
    getVehicleStatus()
  }, [])

  return (
    <Form<RequestFiltersValues, typeof requestFiltersSchema>
      schema={requestFiltersSchema}
      onSubmit={onSuccess}
    >
      {({ register, formState: { errors } }) => (
        <div className='flex flex-col gap-3 text-left md:flex-row md:justify-end'>
          <InputField
            label='Placa'
            registration={register('licencePlate', {
              onChange: (e) => {
                const { value = '' } = e.target
                e.target.value = value.toUpperCase()
              },
            })}
            error={errors.licencePlate}
            placeholder='ABC123'
          />
          <SelectField
            label='Estado'
            options={[emptySelect, ...status]}
            registration={register('statusId')}
            error={errors.statusId}
          />
          <Button
            type='submit'
            color='tertiary'
            className='w-full mt-5 md:w-fit md:self-start md:mt-8'
          >
            Buscar
          </Button>
        </div>
      )}
    </Form>
  )
}
