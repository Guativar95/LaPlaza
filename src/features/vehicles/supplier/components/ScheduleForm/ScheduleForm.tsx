import { FC, useEffect, useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Form, InputField, Option, SelectField, TextAreaField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { getVisitTypes } from '@/features/vehicles/common/api/requestSelects'
import { emptySelect } from '@/utils/defaults'

import { scheduleSchema, ScheduleValues } from './types'

export type ScheduleFormProps = {
  onSuccess: SubmitHandler<ScheduleValues>
  isLoading?: boolean
}

export const ScheduleForm: FC<ScheduleFormProps> = ({ onSuccess, isLoading }) => {
  const [visitTypes, setVisitTypes] = useState([] as Option[])
  const loadSelects = async () => {
    try {
      const { data } = await getVisitTypes()
      setVisitTypes(data.map(({ id, name }) => ({ label: name, value: id })))
    } catch (error) {
      toast.error('Error cargando los tipos de visita')
    }
  }

  useEffect(() => {
    loadSelects()
  }, [])

  return (
    <Form<ScheduleValues, typeof scheduleSchema> schema={scheduleSchema} onSubmit={onSuccess}>
      {({ register, formState: { errors } }) => (
        <>
          <div>
            <SelectField
              label='Tipo'
              options={[emptySelect, ...visitTypes]}
              registration={register('typeVisitId', { valueAsNumber: true })}
              error={errors.typeVisitId}
            />
            <InputField
              label='Dirección'
              registration={register('location')}
              error={errors.location}
            />
            <InputField
              type='date'
              label='Fecha'
              registration={register('scheduledDate', {
                setValueAs: (val) => (val ? new Date(val) : undefined),
              })}
              error={errors.scheduledDate}
              min={new Date().toISOString().split('T')[0]}
            />
            <TextAreaField
              label='Observación'
              registration={register('observation')}
              error={errors.observation}
            />
          </div>
          <div className='flex justify-center'>
            <Button type='submit' color='secondary' isLoading={isLoading} disabled={isLoading}>
              Enviar
            </Button>
          </div>
        </>
      )}
    </Form>
  )
}
