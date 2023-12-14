import React, { ReactNode, useEffect, useState } from 'react'

import { Button } from '../Button'

import { Modal } from './Modal'
import { ModalBody } from './ModalBody'
import { ModalFooter } from './ModalFooter'
import { ModalHeader } from './ModalHeader'

interface ModalConfirmProps {
  show?: boolean
  title: string
  content?: string
  children?: ReactNode
  rejectText?: string
  acceptText?: string
  onReject?: (cb: () => void) => void
  onAccept?: (cb: () => void) => void
}

export const ModalConfirm = React.memo(
  ({
    show = false,
    title,
    children,
    content,
    onAccept,
    onReject,
    rejectText = 'Cancelar',
    acceptText = 'Confirmar',
  }: ModalConfirmProps) => {
    const [showModal, setShowModal] = useState(show)

    useEffect(() => {
      setShowModal(show)
    }, [show])

    const closeModal = () => setShowModal(false)

    const handleReject = () => {
      setShowModal(false)
      onReject && onReject(closeModal)
    }
    const handleAccept = () => {
      setShowModal(false)
      onAccept && onAccept(closeModal)
    }

    if (!showModal) return null
    return (
      <Modal show={showModal} size='md'>
        <ModalHeader title={title} onClose={handleReject} />
        <ModalFooter>
          <div className='w-full flex justify-end gap-2 mt-2'>
            <Button color='danger' variant='text' onClick={() => handleReject()}>
              {rejectText}
            </Button>
            {Boolean(children || content) && <ModalBody>{children || content}</ModalBody>}
            <Button color='dark' onClick={() => handleAccept()}>
              {acceptText}
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    )
  }
)

ModalConfirm.displayName = 'ModalConfirm'
