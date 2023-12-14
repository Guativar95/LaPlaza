import { ReactNode } from 'react'

interface ModalBodyProps {
  children: ReactNode
}

export const ModalBody = ({ children }: ModalBodyProps) => {
  return <div className='relative flex-auto'>{children}</div>
}
