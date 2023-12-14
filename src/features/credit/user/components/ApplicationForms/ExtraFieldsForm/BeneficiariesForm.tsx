import { FC, useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { InputField, NumericField } from '@/components/Form'
import { Button } from '@/components/ui/Button'

import { NextButton } from './NextButton'
import { PreviousButton } from './PreviousButton'
import { beneficiarySchema, BeneficiaryValues, FormProps } from './types'

const LIMIT_BENEFICIARIES = 3
const MAX_PERCENTAGE = 100

export type BeneficiariesFormProps = FormProps<BeneficiaryValues> & {}

export const BeneficiariesForm: FC<BeneficiariesFormProps> = ({
  onPrevious,
  onSuccess,
  defaultValues,
}) => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<BeneficiaryValues>({
    resolver: zodResolver(beneficiarySchema),
    mode: 'all',
    defaultValues: defaultValues?.beneficiaries
      ? defaultValues
      : {
          beneficiaries: [{ percentage: 100 }],
        },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'beneficiaries' })
  const [percentages, setPercentages] = useState<number[]>(
    defaultValues?.beneficiaries
      ? defaultValues.beneficiaries!.map((el) => el!.percentage!)
      : [MAX_PERCENTAGE]
  )

  const setPercentageByIndex = (idx: number, value: number) => {
    setPercentages((p) => {
      const copy = [...p]
      copy[idx] = value

      return copy
    })
  }

  const appendBeneficiary = () => {
    const nextPercentage = MAX_PERCENTAGE - total
    append({ name: '', relationship: '', percentage: nextPercentage })
    setPercentageByIndex(fields.length, nextPercentage)
  }

  const removeBeneficiary = (index: number) => {
    remove(index)
    setPercentages((p) => p.filter((_, idx) => idx !== index))
  }

  const total = useMemo(() => {
    let total = 0
    percentages.forEach((value) => {
      total += value
    })

    setValue('totalPercentage', total)
    if (total === MAX_PERCENTAGE) {
      clearErrors('totalPercentage')
    }

    return total
  }, [percentages])

  const isMaxBeneficiaries = LIMIT_BENEFICIARIES === fields.length
  const thereIsOnlyOneBeneficiary = fields.length === 1

  return (
    <form onSubmit={handleSubmit(onSuccess)}>
      <h2 className='text-2xl mb-5 font-bold'>Beneficiarios seguro accidentes personales</h2>
      <div className='flex flex-col gap-3'>
        {fields.map(({ id }, idx) => (
          <fieldset key={id} className='relative flex flex-col gap-3 md:flex-row'>
            <div className='w-full'>
              <InputField
                label='Nombre'
                registration={register(`beneficiaries.${idx}.name`)}
                error={errors.beneficiaries?.[idx]?.name}
              />
            </div>
            <div className='w-full'>
              <InputField
                label='Parentesco'
                registration={register(`beneficiaries.${idx}.relationship`)}
                error={errors.beneficiaries?.[idx]?.relationship}
              />
            </div>
            <div className='w-full'>
              <NumericField
                label='Porcentaje'
                control={control}
                name={`beneficiaries.${idx}.percentage`}
                error={errors.beneficiaries?.[idx]?.percentage}
                suffix=' %'
                maxLength={5}
                onValueChange={({ floatValue }) => setPercentageByIndex(idx, floatValue ?? 0)}
              />
            </div>
            {!thereIsOnlyOneBeneficiary && (
              <button
                className='absolute -top-1 right-0 border border-red-500 rounded-full text-red-500 px-2 hover:bg-red-50'
                onClick={() => removeBeneficiary(idx)}
              >
                Remover
              </button>
            )}
          </fieldset>
        ))}
      </div>

      <div className='flex justify-between items-center mt-2'>
        <div>
          {!isMaxBeneficiaries && (
            <Button onClick={appendBeneficiary} variant='text'>
              Agregar beneficiario
            </Button>
          )}
        </div>
        <div className='text-right'>
          <p className='text-lg'>
            <span className='font-bold'>TOTAL:</span> {total} %
          </p>
          {errors.totalPercentage && (
            <p className='text-red-500 text-sm'>* {errors.totalPercentage.message}</p>
          )}
        </div>
      </div>

      <div className='flex justify-end gap-2 my-5'>
        <PreviousButton onPrevious={onPrevious} />
        <NextButton />
      </div>
    </form>
  )
}
