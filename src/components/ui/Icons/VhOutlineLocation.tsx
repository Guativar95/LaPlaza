import React from 'react'

import img from './images/vhOutlineLocation.png'
import { IconBaseProps } from './types'

export const VhOutlineLocation: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono veículo' className={className} />
    </figure>
  )
}
