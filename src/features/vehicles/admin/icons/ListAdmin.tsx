import React from 'react'

import img from './images/list.png'
import { IconBaseProps } from './type'

export const ListAdmin: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono lista' className={className} />
    </figure>
  )
}
