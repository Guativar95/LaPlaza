import React from 'react'

import img from './images/mechanic.png'
import { IconBaseProps } from './type'

export const MechanicAdmin: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono lista' className={className} />
    </figure>
  )
}
