import React from 'react'

import img from './images/vhOutlineOnHand.png'
import { IconBaseProps } from './types'

export const VhOutlineOnHand: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono veículo' className={className} />
    </figure>
  )
}
