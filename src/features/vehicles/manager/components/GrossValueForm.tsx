import { FC, useId } from 'react'
import {
  SimpleNumericForm,
  SimpleNumericValues,
} from '@vehicles/common/components/SimpleNumericForm'

import { Button } from '@/components/ui/Button'

export type GrossValueFormProps = {
  defaultValues: { grossValue: number }
  isLoading?: boolean
  onSuccess: (values: SimpleNumericValues) => void
}

export const GrossValueForm: FC<GrossValueFormProps> = ({
  defaultValues,
  onSuccess,
  isLoading,
}) => {
  const formId = useId()

  return (
    <>
      <SimpleNumericForm
        formId={formId}
        onSuccess={onSuccess}
        labels={{
          value: 'Valor bruto',
        }}
        defaultValues={{ value: defaultValues?.grossValue }}
        showSubmitButton={false}
      />
      <div className='flex justify-center my-3'>
        <Button
          type='submit'
          variant='gradient'
          form={formId}
          isLoading={isLoading}
          disabled={isLoading}
        >
          Confirmar
        </Button>
      </div>
    </>
  )
}
