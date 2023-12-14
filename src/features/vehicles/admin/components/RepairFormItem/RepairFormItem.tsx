import { FC, useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { InputField, Option, SelectField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { emptySelect } from '@/utils/defaults'

import { useRepairContext } from '../../store/RepairContext'

import { repairItemSchema, RepairItemValues } from './types'

export type RepairFormItemProps = {
  onSuccess: (values: RepairItemValues) => void
  readonly?: boolean
}

export const RepairFormItem: FC<RepairFormItemProps> = ({ onSuccess, readonly }) => {
  const { estimates } = useRepairContext()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RepairItemValues>({
    resolver: zodResolver(repairItemSchema),
  })

  const handleSucess: SubmitHandler<RepairItemValues> = (values) => {
    reset()
    onSuccess(values)
  }

  const estimatesAsOptions = useMemo<Option[]>(
    () => estimates.map(({ id, name }) => ({ label: name, value: id })),
    [estimates]
  )

  return (
    <form onSubmit={handleSubmit(handleSucess)}>
      <div className='lg:flex lg:gap-2'>
        <div className='w-full'>
          <SelectField
            label='Tipo'
            required
            options={[emptySelect, ...estimatesAsOptions]}
            registration={register('estimationTypeId', { valueAsNumber: true })}
            error={errors.estimationTypeId}
            disabled={readonly}
          />
        </div>
        <div className='w-full'>
          <InputField
            label='Descripción'
            registration={register('description')}
            error={errors.description}
            disabled={readonly}
          />
        </div>
      </div>
      {!readonly && (
        <div className='flex justify-end mt-2'>
          <Button type='submit' variant='text'>
            Agregar
          </Button>
        </div>
      )}
    </form>
  )
}
