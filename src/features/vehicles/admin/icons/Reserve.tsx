import React from 'react'

import img from './images/reserve.png'
import { IconBaseProps } from './type'

export const Reserve: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono reservar' className={className} />
    </figure>
  )
}
