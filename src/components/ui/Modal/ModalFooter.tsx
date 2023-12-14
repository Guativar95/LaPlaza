import { ReactNode } from 'react'

interface ModalFooterProps {
  closeText?: string
  children?: ReactNode
  onClose?: () => void
}

export const ModalFooter = ({ closeText = 'Cerrar', onClose, children }: ModalFooterProps) => {
  return (
    <div className='flex items-center mt-4'>
      {children ? (
        <>{children}</>
      ) : (
        <>
          {onClose && (
            <button
              className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
              type='button'
              onClick={() => onClose()}
            >
              {closeText}
            </button>
          )}
        </>
      )}
    </div>
  )
}
