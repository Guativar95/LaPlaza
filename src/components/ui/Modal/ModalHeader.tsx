import { ReactNode } from 'react'
import { IoMdClose } from 'react-icons/io'
import clsx from 'clsx'

interface ModalHeaderProps {
  children?: ReactNode
  title?: string
  onClose?: () => void
}

export const ModalHeader = ({ title, children, onClose }: ModalHeaderProps) => {
  return (
    <div className={clsx('flex items-start justify-between gap-2', title ? 'mb-4' : '')}>
      {children || <h3 className='text-xl font-semibold'>{title}</h3>}
      {Boolean(onClose) && (
        <button
          onClick={onClose}
          className='relative p-1 -right-3 -top-4 text-secondary text-2xl rounded-full focus-visible:outline-none focus-visible:bg-gray-100'
        >
          <IoMdClose />
        </button>
      )}
    </div>
  )
}
