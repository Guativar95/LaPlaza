import { ReactNode, useEffect, useRef } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import clsx from 'clsx'

import { useAccordion } from './AccordionContext'

export interface AccordionItemProps {
  title: string
  children: ReactNode
  contentClassName?: string
  titleClassName?: string
}

export const AccordionItem = ({
  title,
  children,
  contentClassName,
  titleClassName,
}: AccordionItemProps) => {
  const idRef = useRef<number>(-1)
  const { subscribe, builder } = useAccordion()

  const { toggle, get } = builder(idRef.current)
  const { expanded } = get()

  const onClickHandler = () => {
    toggle()
  }

  useEffect(() => {
    idRef.current = subscribe()
  }, [])

  return (
    <div className='w-full'>
      <button
        type='button'
        onClick={onClickHandler}
        className={clsx(
          'p-3 w-full flex justify-between items-center gap-2',
          expanded
            ? 'bg-white bg-gradient-to-br from-transparent via-tertiary-100/10 to-tertiary-100/50'
            : '',
          titleClassName
        )}
      >
        <span>{title}</span>
        <FiChevronDown className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      <div className={clsx('p-3', expanded ? '' : 'hidden', contentClassName)}>{children}</div>
    </div>
  )
}
