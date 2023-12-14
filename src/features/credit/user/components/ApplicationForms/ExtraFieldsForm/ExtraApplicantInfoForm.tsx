import { FC, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { BooleanGroup, InputField, NumericField, Option, SelectField } from '@/components/Form'
import { emptySelect } from '@/utils/defaults'

import { NextButton } from './NextButton'
import { PreviousButton } from './PreviousButton'
import { extraApplicantInfoSchema, ExtraApplicantInfoValues, FormProps } from './types'

export type ExtraApplicantInfoFormProps = FormProps<ExtraApplicantInfoValues> & {}

export const ExtraApplicantInfoForm: FC<ExtraApplicantInfoFormProps> = ({
  onSuccess,
  onPrevious,
  defaultValues,
}) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<ExtraApplicantInfoValues>({
    resolver: zodResolver(extraApplicantInfoSchema),
    defaultValues: defaultValues?.mailSending
      ? defaultValues
      : {
          landLine: '',
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: '',
        },
  })

  const [hasSocialNetworks, setHasSocialNetworks] = useState(
    defaultValues?.hasSocialNetworks ?? false
  )

  const correspondenceTypes = useMemo<Option[]>(
    () => [
      { value: 'E-mail', label: 'E-mail' },
      { value: 'Residencia', label: 'Residencia' },
      { value: 'Oficina', label: 'Oficina' },
    ],
    []
  )

  return (
    <>
      <h2 className='text-2xl mb-5 font-bold'>Datos personales y de correspondencia</h2>
      <form onSubmit={handleSubmit(onSuccess)}>
        <div className='grid gap-3 md:grid-cols-2'>
          <InputField label='Hobbies' registration={register('hobbies')} error={errors.hobbies} />
          <InputField
            label='Localidad de residencia'
            registration={register('location')}
            error={errors.location}
          />
          <InputField
            label='Barrio de residencia'
            registration={register('neighborhood')}
            error={errors.neighborhood}
          />
          <NumericField
            label='Teléfono fijo'
            control={control}
            name='landLine'
            error={errors.landLine}
            valueAs='string'
          />
          <SelectField
            label='Envío de correspondencia'
            options={[emptySelect, ...correspondenceTypes]}
            registration={register('mailSending')}
            error={errors.mailSending}
          />
          <div className='col-span-2'>
            <BooleanGroup
              control={control}
              label='¿Tiene redes sociales?'
              name='hasSocialNetworks'
              error={errors.hasSocialNetworks}
              onValueChange={(val) => setHasSocialNetworks(val)}
            />
          </div>
          {hasSocialNetworks && (
            <>
              <InputField
                label='Twitter'
                registration={register('twitter')}
                error={errors.twitter}
                placeholder='@usuario.ejemplo'
              />
              <InputField
                label='Facebook'
                registration={register('facebook')}
                error={errors.facebook}
                placeholder='usuario'
              />
              <InputField
                label='Instagram'
                registration={register('instagram')}
                error={errors.instagram}
                placeholder='@usuario.ejemplo'
              />
              <InputField
                label='LinkedIn'
                registration={register('linkedin')}
                error={errors.linkedin}
                placeholder='usuario'
              />
            </>
          )}
        </div>

        <div className='flex justify-end gap-2'>
          <PreviousButton onPrevious={onPrevious} />
          <NextButton />
        </div>
      </form>
    </>
  )
}
