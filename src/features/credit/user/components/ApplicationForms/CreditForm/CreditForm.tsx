import { FC, useEffect, useState } from 'react'
import { getInitialPaymentOrigins } from '@credit/user/api/creditSelects'

import { Form, NumericField, Option, SelectField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { Vehicle } from '@/features/vehicles/common'
import { DefaultValuesForm } from '@/types'
import { emptySelect, feesOptions } from '@/utils/defaults'
import { mapSelectToOption } from '@/utils/maps'
import storage from '@/utils/storage'

import { creditSchema, CreditValues, FullCreditValues } from './types'

export type CreditFormProps = {
  onPrevious: () => void
  onSuccess: (values: FullCreditValues) => void
  vehicle: Pick<Vehicle, 'grossValue' | 'initialFee' | 'line' | 'brand'>
  defaultValues?: DefaultValuesForm<CreditValues>
}

export const CreditForm: FC<CreditFormProps> = ({
  onSuccess,
  onPrevious,
  vehicle,
  defaultValues,
}) => {
  const selectedCreditValues = storage.getCreditValues()

  const [initialPaymentOrigins, setInitialPaymentOrigins] = useState<Option[]>([])
  const [initialPayment, setInitialPayment] = useState(selectedCreditValues.initialPayment)

  const valueToFinance = vehicle.grossValue - initialPayment

  const handleSuccess = (values: CreditValues) => {
    onSuccess({ ...values, valueToFinance })
  }

  useEffect(() => {
    getInitialPaymentOrigins().then((res) => {
      setInitialPaymentOrigins(mapSelectToOption(res.data))
    })
  }, [])

  const refinedCreditSchema = creditSchema
    .refine((values) => values.initialPayment >= vehicle.initialFee, {
      path: ['initialPayment'],
      message: `Cuota mínima de ${vehicle.initialFee}`,
    })
    .refine((args) => args.initialPayment <= vehicle.grossValue, {
      path: ['initialPayment'],
      message: `Cuota máxima de ${vehicle.grossValue}`,
    })

  return (
    <>
      <h2 className='text-2xl mb-5 font-bold'>Confirmar cuota inicial</h2>
      <Form<CreditValues, typeof refinedCreditSchema>
        schema={refinedCreditSchema}
        onSubmit={handleSuccess}
        options={{ mode: 'all', defaultValues }}
      >
        {({ register, control, formState: { errors } }) => (
          <>
            <div>
              <h2 className='text-xl'>
                <span>Vehículo: </span>
                <span className='capitalize'>{vehicle.brand.toLocaleLowerCase()}</span> -{' '}
                <span className='capitalize'>
                  {vehicle.line.split(' ', 2).join(' ').toLocaleLowerCase()}
                </span>
              </h2>
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
              <SelectField
                label='Cuotas'
                options={[emptySelect, ...feesOptions]}
                defaultValue={String(selectedCreditValues.fee)}
                registration={register('deadline', {
                  valueAsNumber: true,
                  onChange: (e) => {
                    const { value } = e.target
                    if (value) {
                      storage.setCreditValues({
                        ...selectedCreditValues,
                        fee: Number(e.target.value),
                      })
                    }
                  },
                })}
                error={errors.deadline}
              />
              <NumericField
                label='Cuota inicial'
                control={control}
                name='initialPayment'
                error={errors.initialPayment}
                defaultValue={initialPayment}
                value={initialPayment}
                onValueChange={({ floatValue }) => {
                  const value = floatValue ?? 0
                  setInitialPayment(value)
                  storage.setCreditValues({
                    ...selectedCreditValues,
                    initialPayment: value,
                  })
                }}
                formatAs='currency'
              />
              <SelectField
                label='Origen cuota inicial'
                options={[emptySelect, ...initialPaymentOrigins]}
                registration={register('quotaOriginId')}
                error={errors.quotaOriginId}
              />
              <NumericField
                label='Total a financiar'
                value={valueToFinance >= 0 ? valueToFinance : ''}
                formatAs='currency'
                disabled
              />
            </div>
            <div className='flex flex-col gap-3 md:flex-row md:justify-end'>
              <Button color='secondary' onClick={onPrevious}>
                Anterior
              </Button>
              <Button type='submit' variant='gradient'>
                Solicitar
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  )
}
