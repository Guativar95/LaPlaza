import { FC, ReactNode } from 'react'

export type VehiclePropertyValueProps = {
  icon: string
  label: string
  value: ReactNode
}

export const VehiclePropertyValue: FC<VehiclePropertyValueProps> = ({
  icon,
  label,
  value: valueFromProps,
}) => {
  const value = typeof valueFromProps === 'string' ? valueFromProps.toLowerCase() : valueFromProps

  return (
    <div className='flex gap-1'>
      <div>
        <img src={icon} className='pt-2 h-9'></img>
      </div>
      <div>
        <span className='block font-semibold '>{label}</span>
        <span className='capitalize'>{value}</span>
      </div>
    </div>
  )
}
