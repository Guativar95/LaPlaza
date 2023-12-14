import React, { Fragment, MutableRefObject, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl ',
  xl: 'max-w-3xl',
  '2xl': 'w-[95%] md:max-w-5xl lg:max-w-7xl',
}

export interface ModalProps {
  show: boolean
  size?: keyof typeof sizes
  initialFocus?: MutableRefObject<HTMLElement | null>
  onClose?: () => void
  children: ReactNode
}

export const Modal = React.memo(
  ({ show, children, initialFocus, size = 'sm', onClose }: ModalProps) => {
    if (!show) return null

    const cls = sizes[size]

    return (
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={onClose || (() => {})}
          initialFocus={initialFocus}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  className={clsx(
                    'transform overflow-hidden rounded-[2.5rem] rounded-tl-[1.5rem] rounded-br-lg bg-white p-6 text-left align-middle shadow-xl transition-all',
                    cls
                  )}
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }
)

Modal.displayName = 'Modal'
