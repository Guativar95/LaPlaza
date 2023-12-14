import { ReactNode } from 'react'
import clsx from 'clsx'

interface WrapperProps {
  children: ReactNode
  className?: string
}

export const Wrapper = ({ children, className }: WrapperProps) => {
  return <div className={clsx('max-w-screen-2xl mx-auto px-3 md:px-5', className)}>{children}</div>
}
