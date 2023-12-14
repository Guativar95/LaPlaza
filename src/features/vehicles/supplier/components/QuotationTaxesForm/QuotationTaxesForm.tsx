import { FC, useEffect, useState } from 'react'
import { DefaultValues, useFieldArray, useForm } from 'react-hook-form'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'

import { NumericField, Option, Rules, SelectField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { Taxes } from '@/features/vehicles/common'
import { emptySelect } from '@/utils/defaults'

import { getTaxes } from '../../api/getTaxes'

import { QuotationTaxesValues } from './types'

type TaxesValidations = {
  [key: number]: Rules
}

export type QuotationTaxesFormProps = {
  defaultValues?: DefaultValues<QuotationTaxesValues>
  onSuccess: (values: QuotationTaxesValues) => void
  disabled?: boolean
}

export const QuotationTaxesForm: FC<QuotationTaxesFormProps> = ({
  defaultValues,
  disabled,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [taxes, setTaxes] = useState<Taxes[]>([])
  const [texasOptions, setTexasOptions] = useState<Option[]>([])
  const [taxesValidations, setTaxesValidations] = useState({} as TaxesValidations)

  const { control, formState, handleSubmit, getValues, register } = useForm<QuotationTaxesValues>({
    defaultValues,
    mode: 'all',
  })
  const { errors } = formState

  const {
    fields,
    append,
    update,
    remove: handleRemove,
  } = useFieldArray({
    control,
    name: 'taxes',
  })

  const handleAppend = () => {
    append({ taxId: 0, value: 0 })
  }

  const handleSetDefaultValue = (idx: number, taxId: number) => {
    const tax = taxes.find((tax) => tax.id === taxId)
    if (!tax) return

    update(idx, { taxId, value: tax.defaultValue as number })
  }

  useEffect(() => {
    getTaxes().then(({ data }) => {
      const rules = {} as TaxesValidations
      const options: Option[] = []

      data.forEach((tax) => {
        const minValue = tax.minValue ?? 0
        const maxValue = tax.maxValue ?? 100

        rules[tax.id] = {
          required: 'Campo requerido',
          min: { value: minValue, message: `Mínimo ${minValue}%` },
          max: { value: maxValue, message: `Máximo ${maxValue}%` },
        }

        options.push({ label: tax.name, value: tax.id })
      })

      setTaxes(data)
      setTaxesValidations(rules)
      setTexasOptions(options)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return null

  return (
    <form onSubmit={handleSubmit(onSuccess)}>
      <div className='flex justify-end'>
        {!disabled && (
          <Button variant='text' onClick={handleAppend}>
            <div className='flex items-center gap-1'>
              <AiOutlinePlus /> <span>Agregar</span>
            </div>
          </Button>
        )}
      </div>
      {fields.map(({ id }, idx) => {
        const selectedType = getValues(`taxes.${idx}.taxId`)
        const valueValidations = taxesValidations[selectedType]

        const isRequired = Boolean(taxes.find((tax) => tax.id === selectedType)?.addByDefault)
        const showDeleteButton = !isRequired && !disabled

        return (
          <div key={id} className='flex gap-2'>
            <div className='w-2/5'>
              <SelectField
                label='Tipo de impuesto'
                options={[emptySelect, ...texasOptions]}
                registration={register(`taxes.${idx}.taxId`, {
                  required: 'Campo requerido',
                  valueAsNumber: true,
                  onChange: (e) => {
                    const { value } = e.target
                    if (value) handleSetDefaultValue(idx, Number(value))
                  },
                })}
                error={errors.taxes?.[idx]?.taxId}
                disabled={isRequired || disabled}
              />
            </div>
            <div className='w-3/5'>
              <NumericField
                label='Tasa'
                control={control}
                name={`taxes.${idx}.value`}
                error={errors.taxes?.[idx]?.value}
                suffix=' %'
                maxLength={5}
                rules={{
                  required: 'Campo requerido',
                  ...valueValidations,
                }}
                disabled={disabled}
              />
            </div>
            {showDeleteButton && (
              <Button
                color='danger'
                className='mt-[1.95rem] h-[2.7rem]'
                onClick={() => handleRemove(idx)}
              >
                <BsTrash />
              </Button>
            )}
          </div>
        )
      })}
      {fields.length === 0 && (
        <p className='italic text-center'>- No hay impuestos para esta cotización -</p>
      )}
      <footer className='flex justify-end mt-4'>
        {!disabled && (
          <Button type='submit' color='secondary' disabled={disabled}>
            Confirmar
          </Button>
        )}
      </footer>
    </form>
  )
}
