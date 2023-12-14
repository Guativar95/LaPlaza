import { FC, Ref } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { NumericField, Option, SelectField } from '@/components/Form'
import { DefaultValuesForm } from '@/types'

import { goodSchema, GoodValues } from './types'

export type GoodFormProps = {
  innerRef: Ref<HTMLFormElement>
  goodTypes: Option[]
  onSucces: (values: GoodValues) => void
  onInvalid: () => void
  defaultValues?: DefaultValuesForm<GoodValues>
}

export const GoodForm: FC<GoodFormProps> = ({
  onSucces,
  onInvalid,
  innerRef,
  goodTypes,
  defaultValues,
}) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<GoodValues>({
    mode: 'all',
    resolver: zodResolver(goodSchema),
    defaultValues,
  })

  return (
    <form
      onSubmit={handleSubmit(onSucces, onInvalid)}
      ref={innerRef}
      className='grid gap-3 md:grid-cols-2'
    >
      <SelectField
        label='Tipo'
        options={goodTypes}
        registration={register('goodTypeId')}
        error={errors.goodTypeId}
      />
      <NumericField
        label='Valor'
        control={control}
        name='price'
        error={errors.price}
        formatAs='currency'
      />
    </form>
  )
}
