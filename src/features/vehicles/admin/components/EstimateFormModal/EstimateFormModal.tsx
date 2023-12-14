import { FC, useState } from 'react'
import { toast } from 'react-toastify'

import { Form, InputField } from '@/components/Form'
import { Button } from '@/components/ui/Button'
import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

import { createEstimate } from '../../api/createEstimate'

import { estimateSchema, EstimateValues } from './types'

export type EstimateFormModalProps = {
  show: boolean
  onSuccess: () => void
  onClose: () => void
}

export const EstimateFormModal: FC<EstimateFormModalProps> = ({ show, onSuccess, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (values: EstimateValues) => {
    setIsLoading(true)
    try {
      await createEstimate(values)
      toast.success('Tipo de cotización creado')
      onSuccess()
    } catch (error) {
      toast.error('No pudimos crear el tipo de cotización')
    } finally {
      setIsLoading(false)
    }
  }

  if (!show) return null

  return (
    <Modal show={show} size='lg'>
      <ModalHeader title='Crear tipo de estimación' />
      <ModalBody>
        <Form<EstimateValues, typeof estimateSchema>
          schema={estimateSchema}
          onSubmit={handleSubmit}
          className='w-[25rem] max-w-full'
        >
          {({ register, formState: { errors } }) => (
            <>
              <div>
                <InputField label='Nombre' registration={register('name')} error={errors.name} />
              </div>

              <div className='flex justify-end gap-2'>
                <Button onClick={onClose} color='light' disabled={isLoading}>
                  Cerrar
                </Button>
                <Button type='submit' isLoading={isLoading} disabled={isLoading}>
                  Guardar
                </Button>
              </div>
            </>
          )}
        </Form>
      </ModalBody>
    </Modal>
  )
}
