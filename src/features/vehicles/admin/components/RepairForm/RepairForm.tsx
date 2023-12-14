import { FC, useMemo } from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Timeline } from 'flowbite-react'

import { Option, SelectField } from '@/components/Form'
import { emptySelect } from '@/utils/defaults'

import { useRepairContext } from '../../store/RepairContext'
import { RepairFormItem } from '../RepairFormItem'

import { repairSchema, RepairValues } from './types'

export type RepairFormProps = {
  formId: string
  onSuccess: SubmitHandler<RepairValues>
  itemLimit?: number
  readonly?: boolean
}

export const RepairForm: FC<RepairFormProps> = ({
  formId,
  onSuccess,
  readonly,
  itemLimit = 30,
}) => {
  const { estimates, providers } = useRepairContext()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RepairValues>({
    resolver: zodResolver(repairSchema),
    mode: 'all',
  })

  const {
    fields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: 'items',
  })

  const providerAsOptions = useMemo<Option[]>(
    () => providers.map<Option>(({ userId, userName }) => ({ label: userName, value: userId })),
    [providers]
  )

  const isInItemLimit = fields.length === itemLimit

  return (
    <>
      <RepairFormItem onSuccess={appendItem} readonly={isInItemLimit || readonly} />
      {isInItemLimit && (
        <div className='my-2'>
          <Alert color='warning'>
            <p>Alcanzo el limite de items para una reparación</p>
          </Alert>
        </div>
      )}

      <form id={formId} onSubmit={handleSubmit(onSuccess)} className='my-4'>
        {fields.length > 0 && (
          <details className='mb-4' open>
            <summary className='select-none'>{fields.length} observacion(es)</summary>
            <div className='pt-4'>
              <Timeline>
                {fields.map(({ id, description, estimationTypeId }, idx) => (
                  <Timeline.Item key={id} className='relative bg-gray-50 rounded-lg p-2'>
                    <Timeline.Content>
                      <button
                        className='absolute top-1.5 right-1 text-red-500 bg-red-50 border border-red-400 rounded-full px-2'
                        onClick={() => removeItem(idx)}
                      >
                        <span>Remover</span>
                      </button>
                      <p>{estimates.find((e) => e.id === estimationTypeId)?.name}</p>
                      <Timeline.Body className='mb-0'>{description}</Timeline.Body>
                    </Timeline.Content>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </details>
        )}

        {errors.items && (
          <div className='my-2'>
            <Alert color='failure'>
              <p>{errors.items.message}</p>
            </Alert>
          </div>
        )}

        <SelectField
          label='Proveedor'
          options={[emptySelect, ...providerAsOptions]}
          required
          registration={register('providerId')}
          error={errors.providerId}
          disabled={readonly}
        />
      </form>
    </>
  )
}
