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
  saveProgressOnChange,
}) => {
  return (
    <Form<InternationalBusinessValues, typeof internationalBusinessSchema>
      schema={internationalBusinessSchema}
      onSubmit={onSuccess}
      innerRef={innerRef}
      options={{ defaultValues }}
    >
      {({ register, getValues, formState: { errors } }) => (
        <SelectField
          label='Tipo'
          options={internationalBusinessTypes}
          registration={register('internationalBusinessTypeId', {
            onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
          })}
          error={errors.internationalBusinessTypeId}
        />
      )}
    </Form>
  )
}
