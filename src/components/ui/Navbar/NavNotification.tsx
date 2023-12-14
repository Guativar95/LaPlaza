import { BsFillBellFill } from 'react-icons/bs'
import { Tooltip } from 'flowbite-react'

import { useAlert } from '@/hooks/useAlerts'
import { useAuth } from '@/lib/auth'

export const NavNotification = () => {
  const { user } = useAuth()
  const { data } = useAlert()
  const hasNotifications = data ? !data.overallReading : false

  if (!user) return null

  return hasNotifications ? (
    <Tooltip content='Tiene solicitudes pendientes' placement='bottom'>
      <div className='relative'>
        <BsFillBellFill className='text-2xl text-primary' />
        <div className='absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-tertiary' />
      </div>
    </Tooltip>
  ) : (
    <BsFillBellFill className='text-2xl text-primary' />
  )
}
