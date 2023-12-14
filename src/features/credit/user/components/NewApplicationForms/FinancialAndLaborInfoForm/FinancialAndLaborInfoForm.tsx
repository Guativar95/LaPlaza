import React, { useEffect } from 'react'

import { Form, InputField, SelectField } from '@/components/Form'
import { NumericField } from '@/components/Form/NumericField'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { emptySelect } from '@/utils/defaults'

import { ApplicationFormStepBaseProps } from '../types'

import { financialAndLaborInfoSchema, FinancialAndLaborInfoValues } from './types'
import { useFinancialAndLaborInfoForm } from './useFinancialAndLaborInfoForm'

export type FinancialAndLaborInfoFormProps =
  ApplicationFormStepBaseProps<FinancialAndLaborInfoValues> & {}

export const FinancialAndLaborInfoForm: React.FC<FinancialAndLaborInfoFormProps> = ({
  actions,
  onSuccess,
  onPrevious,
  defaultValues,
  saveProgressOnChange,
}) => {
  const {
    isLoading,
    professions,
    occupations,
    departments,
    municipalities,
    contractTypes,
    onChangeDepartment,
  } = useFinancialAndLaborInfoForm({
    ...(defaultValues && {
      defaultValues: {
        departmentId: defaultValues.departmentId,
      },
    }),
  })

  useEffect(() => {
    if (defaultValues?.departmentId) {
      onChangeDepartment(defaultValues.departmentId)
    }
  }, [])

  if (isLoading) {
    return <Spinner className='mx-auto' />
  }

  return (
    <>
      <h2 className='text-2xl mb-5 font-bold'>Información laboral</h2>
      <Form<FinancialAndLaborInfoValues, typeof financialAndLaborInfoSchema>
        schema={financialAndLaborInfoSchema}
        onSubmit={onSuccess}
        options={{ defaultValues }}
      >
        {({ register, control, setValue, getValues, formState: { errors } }) => (
          <>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <NumericField
                label='Total ingresos'
                control={control}
                name='totalMonthlyIncome'
                error={errors.totalMonthlyIncome}
                prefix='$ '
                thousandSeparator
                onBlur={() => saveProgressOnChange && saveProgressOnChange(getValues())}
              />
              <SelectField
                label='Profesión'
                options={[emptySelect, ...professions]}
                registration={register('professionId', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors.professionId}
              />
              <SelectField
                label='Ocupacción'
                options={[emptySelect, ...occupations]}
                registration={register('occupationId', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors.occupationId}
              />
              <InputField
                label='Empresa'
                registration={register('companyName', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors.companyName}
              />
              <InputField
                label='Cargo'
                registration={register('position', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors.position}
              />
              <NumericField
                label='Años de antigüedad'
                control={control}
                name='yearsOfService'
                error={errors.yearsOfService}
                maxLength={2}
                onBlur={() => saveProgressOnChange && saveProgressOnChange(getValues())}
              />
              <SelectField
                label='Tipo contrato'
                options={[emptySelect, ...contractTypes]}
                registration={register('contractTypeId')}
                error={errors.contractTypeId}
              />
              <SelectField
                label='Departamento'
                options={[emptySelect, ...departments]}
                registration={register('departmentId', {
                  onChange: (e) => {
                    onChangeDepartment(e.target.value)
                    if (!e.target.value) {
                      setValue('cityId', '')
                    }
                    saveProgressOnChange && saveProgressOnChange(getValues())
                  },
                })}
                error={errors.departmentId}
              />
              <SelectField
                label='Ciudad'
                options={[emptySelect, ...municipalities]}
                registration={register('cityId', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors.cityId}
              />
              <InputField
                label='Dirección empresa'
                registration={register('workAddress', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors.workAddress}
              />
              <NumericField
                label='Teléfono | Celular empresa'
                control={control}
                name='phoneNumber'
                error={errors.phoneNumber}
                valueAs='string'
                maxLength={10}
                onBlur={() => saveProgressOnChange && saveProgressOnChange(getValues())}
              />
            </div>
            <div className='flex flex-col justify-between gap-3 md:flex-row'>
              <div className='flex flex-col md:flex-row'>
                {onPrevious && (
                  <Button color='light' onClick={onPrevious}>
                    Anterior
                  </Button>
                )}
              </div>
              <div className='flex flex-col gap-2 md:flex-row'>
                {actions}
                <Button type='submit' variant='gradient'>
                  Siguiente
                </Button>
              </div>
            </div>
          </>
        )}
      </Form>
    </>
  )
}
