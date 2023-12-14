import React from 'react'

import img from './images/location.png'
import { IconBaseProps } from './type'

export const LocationAdmin: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono lista' className={className} />
    </figure>
  )
}
