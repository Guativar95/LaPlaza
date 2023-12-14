import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@/components/ui/Button'
import { Modal, ModalBody } from '@/components/ui/Modal'
import { formatCurrency } from '@/utils/format'

import { updateInitialPayment } from '../api/updateApplication'
import imgCambio from '../assets/images/valor.png'
import { useApplicationContext } from '../store/ApplicationContext'

export type ModalInitialFeeProps = {}

export const ModalInitialFee: React.FC<ModalInitialFeeProps> = () => {
  const navigate = useNavigate()
  const { initialPayment, application, handleApplicationResponse } = useApplicationContext()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdate = async () => {
    setIsSubmitting(true)
    try {
      const { data } = await updateInitialPayment({
        initialPayment,
        requestCode: application.id,
      })

      handleApplicationResponse(data)
    } catch (error) {
      toast.error('Hemos tenido problemas actualizando la cuota inicial')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Modal show size='xl'>
        <ModalBody>
          <div className='grid grid-rows-3 pr-20  pl-20'>
            <div className='w-20 m-auto'>
              <img src={imgCambio} alt='Pesos' />
            </div>
            <div className='text-center mt-3 '>
              <p>
                La cuota inicial para que puedas <br /> acceder a tu Carfiao es de{' '}
                <span>{formatCurrency(initialPayment)}</span>
              </p>
            </div>
            <div className='flex justify-center gap-2 mt-0'>
              <Button
                className='h-8 w-32'
                isLoading={isSubmitting}
                disabled={isSubmitting}
                onClick={() => {
                  handleUpdate()
                }}
              >
                Continuar
              </Button>

              <Button
                className='h-8 w-32'
                color='danger'
                onClick={() => {
                  navigate(-1)
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}
