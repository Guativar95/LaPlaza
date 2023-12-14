import React from 'react'

import img from './images/service.png'
import { IconBaseProps } from './type'

export const ServiceAdmin: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono lista' className={className} />
    </figure>
  )
}
