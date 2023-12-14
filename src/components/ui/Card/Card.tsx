import { ReactNode } from 'react'
import clsx from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  title?: string
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={clsx('rounded-xl bg-white p-5', className)}>{children}</div>
}
