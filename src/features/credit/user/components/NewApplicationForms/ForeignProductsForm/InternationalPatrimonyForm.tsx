import { FC } from 'react'

import { Form, InputField } from '@/components/Form'

import {
  internationalPatrimonySchema,
  InternationalPatrimonyValues,
  SubformBaseProps,
} from './types'

export type InternationalPatrimonyFormProps = SubformBaseProps<InternationalPatrimonyValues> & {}

export const InternationalPatrimonyForm: FC<InternationalPatrimonyFormProps> = ({
  onSuccess,
  innerRef,
  defaultValues,
  saveProgressOnChange,
}) => {
  return (
    <Form<InternationalPatrimonyValues, typeof internationalPatrimonySchema>
      schema={internationalPatrimonySchema}
      onSubmit={onSuccess}
      innerRef={innerRef}
      options={{ defaultValues }}
    >
      {({ register, getValues, formState: { errors } }) => (
        <div className='grid gap-3 md:grid-cols-2'>
          <InputField
            required
            label='País'
            registration={register('countryId', {
              onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
            })}
            error={errors.countryId}
          />
          <InputField
            required
            label='Ciudad'
            registration={register('cityId', {
              onBlur: () => saveProgressOnChange && saveProgressOnChange(getValues()),
            })}
            error={errors.cityId}
          />
        </div>
      )}
    </Form>
  )
}
