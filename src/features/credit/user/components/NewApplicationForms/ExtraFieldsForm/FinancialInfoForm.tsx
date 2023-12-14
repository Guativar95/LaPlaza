import { FC, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { getEconomicClasses, getEconomicSectors } from '@credit/user/api/creditSelects'

import { BooleanGroup, Form, NumericField, Option, SelectField } from '@/components/Form'
import { Spinner } from '@/components/ui/Spinner'
import { emptySelect } from '@/utils/defaults'
import { mapSelectToOption } from '@/utils/maps'

import { NextButton } from './NextButton'
import { PreviousButton } from './PreviousButton'
import { financialInfoSchema, FinancialInfoValues, FormProps } from './types'

export type FinancialInfoFormProps = FormProps<FinancialInfoValues> & {}

export const FinancialInfoForm: FC<FinancialInfoFormProps> = ({
  onSuccess,
  onPrevious,
  defaultValues,
}) => {
  const [isAnIncomeTaxFiler, setIsAnIncomeTaxFiler] = useState<boolean>(
    defaultValues?.isAnIncomeTaxFiler ?? true
  )
  const [isLoading, setIsLoading] = useState(true)
  const [economicSectors, setEconomicSectors] = useState<Option[]>([])
  const [economicClasses, setEconomicClasses] = useState<Option[]>([])

  const [lastMonthOutcome, setLastMonthOutcome] = useState(
    defaultValues?.ciiuCode
      ? {
          familyExpenses: defaultValues.familyExpenses!,
          loans: defaultValues.loans!,
          leaseOrMortgage: defaultValues.leaseOrMortgage!,
          creditCard: defaultValues.creditCard!,
        }
      : {
          familyExpenses: 0,
          loans: 0,
          leaseOrMortgage: 0,
          creditCard: 0,
        }
  )

  const handleLastMontOutcome = (key: keyof typeof lastMonthOutcome, value: number = 0) => {
    setLastMonthOutcome({ ...lastMonthOutcome, [key]: value })
  }

  const totalLastOutcome = useMemo(() => {
    let total = 0
    Object.values(lastMonthOutcome).forEach((value) => {
      total += value
    })

    return total
  }, [lastMonthOutcome])

  const fetchEconomicClasses = async (economicSector: string) => {
    try {
      const { data } = await getEconomicClasses(economicSector)
      setEconomicClasses(mapSelectToOption(data))
    } catch (error) {
      toast.error('Hemos tenido problemas obteniendo la información de las listas')
    }
  }

  const handleSubmit = (values: FinancialInfoValues) => {
    onSuccess({ ...values, lastMonthTotalOutcome: totalLastOutcome })
  }

  useEffect(() => {
    if (defaultValues?.economicSectorId) {
      Promise.all([getEconomicSectors(), getEconomicClasses(defaultValues.economicSectorId)])
        .then(([economicSectors, economicClasses]) => {
          setEconomicSectors(mapSelectToOption(economicSectors.data))
          setEconomicClasses(mapSelectToOption(economicClasses.data))
        })
        .catch(() => {
          toast.error('Hemos tenido problemas obteniendo la información de las listas')
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      getEconomicSectors()
        .then(({ data }) => {
          setEconomicSectors(mapSelectToOption(data))
          setIsLoading(false)
        })
        .catch(() => {
          toast.error('Hemos tenido problemas obteniendo la información de las listas')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [])

  if (isLoading) {
    return <Spinner className='mx-auto' />
  }

  return (
    <>
      <h2 className='text-2xl mb-5 font-bold'>Información financiera</h2>
      <Form<FinancialInfoValues, typeof financialInfoSchema>
        schema={financialInfoSchema}
        onSubmit={handleSubmit}
        options={{ defaultValues }}
      >
        {({ control, register, setValue, formState: { errors } }) => (
          <>
            <div className='grid gap-3 md:grid-cols-2'>
              <SelectField
                label='Sector económico'
                options={[emptySelect, ...economicSectors]}
                registration={register('economicSectorId', {
                  onChange: (e) => {
                    setValue('ciiuCode', '')
                    const { value } = e.target
                    if (value) {
                      fetchEconomicClasses(value)
                    }
                  },
                })}
                error={errors.economicSectorId}
              />
              <SelectField
                label='Clase económica'
                options={[emptySelect, ...economicClasses]}
                registration={register('ciiuCode')}
                error={errors.ciiuCode}
              />
              <NumericField
                label='Total pasivos del último mes'
                control={control}
                name='lastMonthTotalLiabilities'
                error={errors.lastMonthTotalLiabilities}
                formatAs='currency'
              />
              <NumericField
                label='Total activos del último mes'
                control={control}
                name='lastMonthTotalAssets'
                error={errors.lastMonthTotalAssets}
                formatAs='currency'
              />
              <NumericField
                label='Gastos mensuales familiares'
                control={control}
                name='familyExpenses'
                error={errors.familyExpenses}
                formatAs='currency'
                onValueChange={({ floatValue }) =>
                  handleLastMontOutcome('familyExpenses', floatValue)
                }
              />
              <NumericField
                label='Gastos mensuales en préstamos'
                control={control}
                name='loans'
                error={errors.loans}
                formatAs='currency'
                onValueChange={({ floatValue }) => handleLastMontOutcome('loans', floatValue)}
              />
              <NumericField
                label='Gastos mensuales arriendo o hipoteca'
                control={control}
                name='leaseOrMortgage'
                error={errors.leaseOrMortgage}
                formatAs='currency'
                onValueChange={({ floatValue }) =>
                  handleLastMontOutcome('leaseOrMortgage', floatValue)
                }
              />
              <NumericField
                label='Gastos mensuales en tarjetas'
                control={control}
                name='creditCard'
                error={errors.creditCard}
                formatAs='currency'
                onValueChange={({ floatValue }) => handleLastMontOutcome('creditCard', floatValue)}
              />
              <NumericField
                label='Total egresos del último mes'
                control={control}
                name='lastMonthTotalOutcome'
                value={totalLastOutcome}
                formatAs='currency'
                disabled
              />
              <BooleanGroup
                label='Es declarante de renta'
                error={errors.isAnIncomeTaxFiler}
                control={control}
                name='isAnIncomeTaxFiler'
                onValueChange={(val) => {
                  setIsAnIncomeTaxFiler(val)
                  if (val) {
                    setValue('lastYearTotalIncome', null)
                    setValue('lastYearTotalPatrimony', null)
                  }
                }}
              />
              {!isAnIncomeTaxFiler && (
                <>
                  <NumericField
                    label='Total ingresos del último año'
                    control={control}
                    name='lastYearTotalIncome'
                    error={errors.lastYearTotalIncome}
                    formatAs='currency'
                  />
                  <NumericField
                    label='Total patrimonio del último año'
                    control={control}
                    name='lastYearTotalPatrimony'
                    error={errors.lastYearTotalPatrimony}
                    formatAs='currency'
                  />
                </>
              )}
            </div>
            <div className='flex justify-end gap-2'>
              <PreviousButton onPrevious={onPrevious} />
              <NextButton />
            </div>
          </>
        )}
      </Form>
    </>
  )
}
