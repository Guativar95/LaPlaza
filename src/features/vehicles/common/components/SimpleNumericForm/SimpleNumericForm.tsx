import { FC } from 'react'
import { DefaultValues } from 'react-hook-form'

import { Form, NumericField } from '@/components/Form'
import { Button } from '@/components/ui/Button'

import { simpleNumericSchema, SimpleNumericValues } from './types'

export type SimpleNumericFormProps = {
  onSuccess: (values: SimpleNumericValues) => void
  defaultValues?: DefaultValues<SimpleNumericValues>
  labels?: Record<keyof SimpleNumericValues, string>
  formId?: string
  showSubmitButton?: boolean
  isLoading?: boolean
}

export const SimpleNumericForm: FC<SimpleNumericFormProps> = ({
  onSuccess,
  formId,
  isLoading,
  labels,
  defaultValues,
  showSubmitButton = true,
}) => {
  return (
    <Form<SimpleNumericValues, typeof simpleNumericSchema>
      id={formId}
      schema={simpleNumericSchema}
      onSubmit={onSuccess}
      options={{ defaultValues }}
    >
      {({ control, formState: { errors } }) => (
        <>
          <NumericField
            label={labels?.value ?? 'Valor'}
            control={control}
            name='value'
            error={errors.value}
            formatAs='currency'
          />
          {showSubmitButton && (
            <div className='flex justify-center'>
              <Button variant='gradient' isLoading={isLoading}>
                Confirmar
              </Button>
            </div>
          )}
        </>
      )}
    </Form>
  )
}
