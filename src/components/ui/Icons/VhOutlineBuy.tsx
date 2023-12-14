import React from 'react'

import img from './images/vhOutlineBuy.png'
import { IconBaseProps } from './types'

export const VhOutlineBuy: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono veículo' className={className} />
    </figure>
  )
}
