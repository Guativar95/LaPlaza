import React from 'react'

import img from './images/concessionaire.png'
import { IconBaseProps } from './type'

export const Concessionaire: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono consecionario' className={className} />
    </figure>
  )
}
