import { FC, ReactNode } from 'react'
import clsx from 'clsx'

const variants = {
  grid: 'grid grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] place-items-center gap-2',
  flex: 'flex justify-center flex-wrap gap-2 md:gap-5',
}

export type PanelListProps = {
  children: ReactNode
  variant?: keyof typeof variants
}

export const PanelList: FC<PanelListProps> = ({ children, variant = 'flex' }) => {
  return <div className={clsx(variants[variant])}>{children}</div>
}
