import React, { useEffect } from 'react'

import { Form, InputField, SelectField } from '@/components/Form'
import { NumericField } from '@/components/Form/NumericField'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Spinner'
import { emptySelect } from '@/utils/defaults'

import { ApplicationFormStepBaseProps } from '../types'

import { NewOtpModal } from './NewOtpModal'
import { OTPVerificationStatus, personalInfoSchema, PersonalInfoValues } from './types'
import { usePersonalInfoForm } from './usePersonalInfoForm'

export type PersonalInfoFormProps = ApplicationFormStepBaseProps<PersonalInfoValues> & {
  applicationId: string
  initialVerificationStatus?: OTPVerificationStatus
  onChangeVerificationStatus?: (status: OTPVerificationStatus) => void
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  actions,
  onSuccess,
  applicationId,
  defaultValues,
  saveProgressOnChange,
  initialVerificationStatus,
  onChangeVerificationStatus,
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
    initialVerificationStatus,
    onChangeVerificationStatus,
    ...(defaultValues && {
      defaultValues: {
        departmentId: defaultValues.departmentId,
        email: defaultValues.email,
        phoneNumber: defaultValues.phoneNumber,
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
        {({ register, setValue, trigger, control, getValues, formState: { errors } }) => (
          <>
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
              <InputField
                required
                label='Primer nombre'
                registration={register('name', {
                  onChange: (e) => upperCaseOnChange(e),
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors?.name}
              />
              <InputField
                label='Segundo nombre'
                registration={register('secondName', {
                  onChange: upperCaseOnChange,
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors?.secondName}
              />
              <InputField
                required
                label='Primer apellido'
                registration={register('lastName', {
                  onChange: upperCaseOnChange,
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors?.lastName}
              />
              <InputField
                label='Segundo apellido'
                registration={register('secondLastName', {
                  onChange: upperCaseOnChange,
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors?.secondLastName}
              />
              <SelectField
                required
                label='Tipo documento'
                options={[emptySelect, ...identificationTypes]}
                registration={register('identificationTypeId', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors?.identificationTypeId}
              />
              <InputField
                required
                label='Número documento'
                name='identificationNumber'
                registration={register('identificationNumber', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors.identificationNumber}
                disabled
              />
              <InputField
                required
                label='Lugar de expedición'
                registration={register('identificationIssuedIn', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors.identificationIssuedIn}
                disabled
              />
              <InputField
                required
                type='date'
                label='Fecha de expedición'
                registration={register('expeditionDate', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors?.expeditionDate}
              />
              <InputField
                required
                type='email'
                label='Correo'
                registration={register('email')}
                error={errors?.email}
                onBlur={() => {
                  if (saveProgressOnChange) {
                    trigger('email').then((isValid) => {
                      isValid && saveProgressOnChange(getValues())
                    })
                  }
                }}
              />
              <NumericField
                required
                label='Número celular'
                control={control}
                name='phoneNumber'
                error={errors?.phoneNumber}
                maxLength={10}
                valueAs='string'
                onBlur={() => {
                  if (saveProgressOnChange) {
                    trigger('phoneNumber').then((isValid) => {
                      isValid && saveProgressOnChange(getValues())
                    })
                  }
                }}
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
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors?.departmentId}
              />
              <SelectField
                required
                label='Municipio'
                options={[emptySelect, ...municipalities]}
                registration={register('cityId', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors?.cityId}
              />
              <InputField
                required
                label='Dirección de residencia'
                registration={register('address', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors?.address}
              />
              <InputField
                required
                type='date'
                label='Fecha de nacimiento'
                error={errors?.birthDate}
                registration={register('birthDate', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
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
                registration={register('residenceTypeId', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors?.residenceTypeId}
              />
              <NumericField
                required
                label='Tiempo de residencia (años)'
                control={control}
                name='residenceTimeInYears'
                error={errors.residenceTimeInYears}
                maxLength={2}
                onBlur={() => saveProgressOnChange && saveProgressOnChange(getValues())}
              />
              <SelectField
                required
                label='Estrato'
                options={[emptySelect, ...socialStratum]}
                registration={register('socialStratumId', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors.socialStratumId}
              />
              <SelectField
                required
                label='Genero'
                options={[emptySelect, ...genders]}
                registration={register('gender', {
                  onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
                })}
                error={errors?.gender}
              />
              <NumericField
                required
                label='Personas a cargo'
                control={control}
                name='dependants'
                error={errors.residenceTimeInYears}
                maxLength={2}
                onBlur={() => saveProgressOnChange && saveProgressOnChange(getValues())}
              />
            </div>
            <div className='flex flex-col gap-2 md:flex-row md:justify-end'>
              {getValues('email') &&
              !errors.email &&
              getValues('phoneNumber') &&
              !errors.phoneNumber
                ? actions
                : null}
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
