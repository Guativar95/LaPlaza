import { FC, ReactElement } from 'react'
import clsx from 'clsx'
import { Tooltip } from 'flowbite-react'

import { Card } from '@/components/ui/Card'
import { Link } from '@/components/ui/Link'

const variants = {
  grid: '',
  flex: 'md:w-80',
}

export type PanelCardProps = {
  to: string
  text: string | ReactElement
  icon: ReactElement
  variant?: keyof typeof variants
  className?: string
  hasNotifications?: boolean
}

export const PanelCard: FC<PanelCardProps> = ({
  icon,
  text,
  to,
  hasNotifications,
  variant = 'flex',
}) => {
  return (
    <Card
      className={clsx(
        '!rounded-3xl shadow-lg border-4 text-primary w-full relative',
        variants[variant]
      )}
    >
      {hasNotifications && (
        <div className='absolute top-3 right-3 z-10'>
          <Tooltip content='Hay cambios sin ver'>
            <div className='h-3 w-3 rounded-full bg-primary' />
          </Tooltip>
        </div>
      )}
      <div className='flex justify-center my-2'>
        <div className='mx-auto'>{icon}</div>
      </div>
      <Link to={to}>
        <p className='text-center text-2xl underline'>{text}</p>
      </Link>
    </Card>
  )
}
