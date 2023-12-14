import { FC } from 'react'

import { Form, InputField, NumericField, Option, SelectField } from '@/components/Form'

import { internationalAccountSchema, InternationalAccountValues, SubformBaseProps } from './types'

export type InternationalAccountFormProps = SubformBaseProps<InternationalAccountValues> & {
  internationalProductTypes: Option[]
}

export const InternationalAccountForm: FC<InternationalAccountFormProps> = ({
  onSuccess,
  internationalProductTypes,
  innerRef,
  defaultValues,
  saveProgressOnChange,
}) => {
  return (
    <Form<InternationalAccountValues, typeof internationalAccountSchema>
      schema={internationalAccountSchema}
      onSubmit={onSuccess}
      innerRef={innerRef}
      options={{ defaultValues }}
    >
      {({ register, control, getValues, formState: { errors } }) => (
        <div className='grid gap-3 md:grid-cols-2'>
          <InputField
            label='País'
            registration={register('countryId', {
              onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
            })}
            error={errors.countryId}
          />
          <InputField
            label='Ciudad'
            registration={register('cityId', {
              onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
            })}
            error={errors.cityId}
          />
          <SelectField
            label='Tipo de producto'
            options={internationalProductTypes}
            registration={register('internationalProductTypeId', {
              onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
            })}
            error={errors.internationalProductTypeId}
          />
          <InputField
            label='Otro tipo de producto'
            registration={register('anotherInternationalProductType', {
              onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
            })}
            error={errors.anotherInternationalProductType}
          />
          <InputField
            label='Entidad'
            registration={register('entity', {
              onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
            })}
            error={errors.entity}
          />
          <InputField
            label='Moneda'
            registration={register('currencyId', {
              onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
            })}
            error={errors.currencyId}
          />
          <NumericField
            label='Número producto'
            control={control}
            name='productNumber'
            error={errors.productNumber}
            valueAs='string'
            onBlur={() => saveProgressOnChange && saveProgressOnChange(getValues())}
          />
          <NumericField
            label='Valor'
            control={control}
            error={errors.value}
            name='value'
            prefix='$ '
            thousandSeparator
            onBlur={() => saveProgressOnChange && saveProgressOnChange(getValues())}
          />
        </div>
      )}
    </Form>
  )
}
