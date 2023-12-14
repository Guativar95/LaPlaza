import { ReactNode } from 'react'

import { Button } from '@/components/ui/Button'
import { Modal, ModalHeader } from '@/components/ui/Modal'

interface OTPModalProps {
  otpCodeId: number
  show: boolean
  onVerify: () => void
}

export default function OptionModal({ show }: OTPModalProps) {
  interface ModalBodyProps {
    children: ReactNode
  }

  const onClickAumento = () => {
    alert('continue para mas informacion')
  }

  const ModalBody = ({ children }: ModalBodyProps) => {
    return <div className='relative p-3 flex-auto mx-3'>{children}</div>
  }
  return (
    <Modal show={show} size='xl'>
      <ModalHeader title='Por favor eliga alguna opción ' />
      <ModalBody>
        <Button onClick={onClickAumento} className='mx-1'>
          Aumentar cuota inicial{' '}
        </Button>
        <Button onClick={onClickAumento} className='mx-1'>
          Adjuntar avalistas{' '}
        </Button>
        <Button onClick={onClickAumento} className='mx-1'>
          Seleccionar otro VH{' '}
        </Button>
      </ModalBody>
    </Modal>
  )
}
