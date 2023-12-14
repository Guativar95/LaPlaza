import React from 'react'

import { Modal, ModalBody, ModalHeader } from '@/components/ui/Modal'

export type CardModalWideOfferProps = {
  showCardWideOffer: boolean
  onClose: () => void
}

export const CardModalWideOffer: React.FC<CardModalWideOfferProps> = ({
  showCardWideOffer,
  onClose,
}) => {
  return (
    <Modal show={showCardWideOffer} size='sm'>
      <ModalHeader title='Amplia oferta de vehículos' onClose={onClose} />
      <ModalBody>
        <p className='pb-4 '>
          En nuestro inventario de vehículos vas a encontrar variedad de gamas (alta, media y baja).
        </p>
      </ModalBody>
    </Modal>
  )
}
