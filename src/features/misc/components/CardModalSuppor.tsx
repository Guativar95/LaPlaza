import React from 'react'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

export type CardModalSupporProps = {
  showCardSuppor: boolean
  onClose: () => void
}

export const CardModalSuppor: React.FC<CardModalSupporProps> = ({ showCardSuppor, onClose }) => {
  return (
    <Modal show={showCardSuppor} size='sm'>
      <ModalHeader title='Asesoría de compra y financiación' onClose={onClose} />
      <ModalBody>
        <p className='pb-4'>
          Nuestro equipo Comercial te acompañará y brindará asesoría especializada para que escojas
          el Carfiao que se ajuste a tu necesidad.
        </p>
      </ModalBody>
    </Modal>
  )
}
