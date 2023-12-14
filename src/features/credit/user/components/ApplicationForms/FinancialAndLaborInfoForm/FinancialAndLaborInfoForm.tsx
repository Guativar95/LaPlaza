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
  onSuccess,
  onPrevious,
  defaultValues,
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
        {({ register, control, setValue, formState: { errors } }) => (
          <>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <NumericField
                label='Total ingresos'
                control={control}
                name='totalMonthlyIncome'
                error={errors.totalMonthlyIncome}
                prefix='$ '
                thousandSeparator
              />
              <SelectField
                label='Profesión'
                options={[emptySelect, ...professions]}
                registration={register('professionId')}
                error={errors.professionId}
              />
              <SelectField
                label='Ocupacción'
                options={[emptySelect, ...occupations]}
                registration={register('occupationId')}
                error={errors.occupationId}
              />
              <InputField
                label='Empresa'
                registration={register('companyName')}
                error={errors.companyName}
              />
              <InputField
                label='Cargo'
                registration={register('position')}
                error={errors.position}
              />
              <NumericField
                label='Años de antigüedad'
                control={control}
                name='yearsOfService'
                error={errors.yearsOfService}
                maxLength={2}
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
                  },
                })}
                error={errors.departmentId}
              />
              <SelectField
                label='Ciudad'
                options={[emptySelect, ...municipalities]}
                registration={register('cityId')}
                error={errors.cityId}
              />
              <InputField
                label='Dirección empresa'
                registration={register('workAddress')}
                error={errors.workAddress}
              />
              <NumericField
                label='Teléfono | Celular empresa'
                control={control}
                name='phoneNumber'
                error={errors.phoneNumber}
                valueAs='string'
                maxLength={10}
              />
            </div>
            <div className='flex flex-col justify-end gap-2 md:flex-row'>
              {onPrevious && (
                <Button color='secondary' onClick={onPrevious}>
                  Anterior
                </Button>
              )}
              <Button type='submit' variant='gradient'>
                Siguiente
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  )
}
