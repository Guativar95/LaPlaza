import React, { useEffect } from 'react'

import { Form, InputField, SelectField } from '@/components/Form'
import { NumericField } from '@/components/Form/NumericField'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { emptySelect } from '@/utils/defaults'

import { ApplicationFormStepBaseProps } from '../types'

import { NewOtpModal } from './NewOtpModal'
import { personalInfoSchema, PersonalInfoValues } from './types'
import { usePersonalInfoForm } from './usePersonalInfoForm'

export type PersonalInfoFormProps = ApplicationFormStepBaseProps<PersonalInfoValues> & {
  applicationId: string
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  onSuccess,
  applicationId,
  defaultValues,
}) => {
  const {
    isLoading,
    identificationTypes,
    departments,
    municipalities,
    maritalStatus,
    residenceTypes,
    genders,
    socialStratum,
    upperCaseOnChange,
    onChangeDepartment,
    handleSubmit,
    showOtpModal,
    otp,
  } = usePersonalInfoForm({
    onSuccess,
    applicationId,
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
      <h2 className='text-2xl mb-5 font-bold'>Datos personales</h2>
      <Form<PersonalInfoValues, typeof personalInfoSchema>
        schema={personalInfoSchema}
        onSubmit={handleSubmit}
        options={{ defaultValues }}
      >
        {({ register, setValue, control, formState: { errors } }) => (
          <>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <InputField
                required
                label='Primer nombre'
                registration={register('name', { onChange: upperCaseOnChange })}
                error={errors?.name}
              />
              <InputField
                label='Segundo nombre'
                registration={register('secondName', { onChange: upperCaseOnChange })}
                error={errors?.secondName}
              />
              <InputField
                required
                label='Primer apellido'
                registration={register('lastName', { onChange: upperCaseOnChange })}
                error={errors?.lastName}
              />
              <InputField
                label='Segundo apellido'
                registration={register('secondLastName', { onChange: upperCaseOnChange })}
                error={errors?.secondLastName}
              />
              <SelectField
                required
                label='Tipo documento'
                options={[emptySelect, ...identificationTypes]}
                registration={register('identificationTypeId')}
                error={errors?.identificationTypeId}
              />
              <InputField
                required
                label='Número documento'
                name='identificationNumber'
                registration={register('identificationNumber')}
                error={errors.identificationNumber}
                disabled
              />
              <InputField
                required
                label='Lugar de expedición'
                registration={register('identificationIssuedIn')}
                error={errors.identificationIssuedIn}
                disabled
              />
              <InputField
                required
                type='date'
                label='Fecha de expedición'
                registration={register('expeditionDate')}
                error={errors?.expeditionDate}
              />
              <InputField
                required
                type='email'
                label='Correo'
                registration={register('email')}
                error={errors?.email}
                disabled={otp.isVerified}
              />
              <SelectField
                required
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
                error={errors?.departmentId}
              />
              <SelectField
                required
                label='Municipio'
                options={[emptySelect, ...municipalities]}
                registration={register('cityId')}
                error={errors?.cityId}
              />
              <InputField
                required
                label='Dirección de residencia'
                registration={register('address')}
                error={errors?.address}
              />
              <InputField
                required
                type='date'
                label='Fecha de nacimiento'
                error={errors?.birthDate}
                registration={register('birthDate')}
              />
              <NumericField
                required
                label='Número celular'
                control={control}
                name='phoneNumber'
                error={errors?.phoneNumber}
                maxLength={10}
                valueAs='string'
                disabled={otp.isVerified}
              />
              <SelectField
                required
                options={[emptySelect, ...maritalStatus]}
                label='Estado civil'
                registration={register('maritalStatusId')}
                error={errors?.maritalStatusId}
              />
              <SelectField
                required
                options={[emptySelect, ...residenceTypes]}
                label='Tipo residencia'
                registration={register('residenceTypeId')}
                error={errors?.residenceTypeId}
              />
              <NumericField
                required
                label='Tiempo de residencia (años)'
                control={control}
                name='residenceTimeInYears'
                error={errors.residenceTimeInYears}
                maxLength={2}
              />
              <SelectField
                required
                label='Estrato'
                options={[emptySelect, ...socialStratum]}
                registration={register('socialStratumId')}
                error={errors.socialStratumId}
              />
              <SelectField
                required
                label='Genero'
                options={[emptySelect, ...genders]}
                registration={register('gender')}
                error={errors?.gender}
              />
              <NumericField
                required
                label='Personas a cargo'
                control={control}
                name='dependants'
                error={errors.residenceTimeInYears}
                maxLength={2}
              />
            </div>
            <div className='flex flex-col gap-2 md:flex-row md:justify-end'>
              <Button type='submit' variant='gradient'>
                Siguiente
              </Button>
            </div>
          </>
        )}
      </Form>
      {showOtpModal && (
        <NewOtpModal
          show={showOtpModal}
          onReject={otp.reject}
          onResendEmail={otp.resendEmail}
          onResendSms={otp.resendSms}
          onVerify={otp.verify}
          status={otp.verificationStatus}
        />
      )}
    </>
  )
}
