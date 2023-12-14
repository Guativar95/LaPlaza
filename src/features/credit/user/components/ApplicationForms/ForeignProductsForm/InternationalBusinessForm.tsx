import { FC } from 'react'

import { Form, Option, SelectField } from '@/components/Form'

import { internationalBusinessSchema, InternationalBusinessValues, SubformBaseProps } from './types'

export type InternationalBusinessFormProps = SubformBaseProps<InternationalBusinessValues> & {
  internationalBusinessTypes: Option[]
}

export const InternationalBusinessForm: FC<InternationalBusinessFormProps> = ({
  onSuccess,
  innerRef,
  internationalBusinessTypes,
  defaultValues,
}) => {
  return (
    <Form<InternationalBusinessValues, typeof internationalBusinessSchema>
      schema={internationalBusinessSchema}
      onSubmit={onSuccess}
      innerRef={innerRef}
      options={{ defaultValues }}
    >
      {({ register, formState: { errors } }) => (
        <SelectField
          label='Tipo'
          options={internationalBusinessTypes}
          registration={register('internationalBusinessTypeId')}
          error={errors.internationalBusinessTypeId}
        />
      )}
    </Form>
  )
}
