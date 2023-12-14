import { ReactNode } from 'react'
import clsx from 'clsx'

import { AccordionItem } from '@/components/ui/Accordion/AccordionItem'

export interface FilterItemProps {
  title: string
  children: ReactNode
  className?: string
}

export const FilterItem = ({ title, children, className }: FilterItemProps) => {
  return (
    <AccordionItem
      title={title}
      titleClassName='text-lg'
      contentClassName={clsx(
        'absolute z-10 top-full left-0 md:left-auto md:min-w-[20rem] max-w-full mt-1 rounded-bl-md rounded-br-md bg-white bg-gradient-to-br from-transparent via-transparent to-tertiary-100',
        className
      )}
    >
      <div className='p-2'>{children}</div>
    </AccordionItem>
  )
}
