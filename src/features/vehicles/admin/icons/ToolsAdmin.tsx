import React from 'react'

import img from './images/tools.png'
import { IconBaseProps } from './type'

export const ToolsAdmin: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono lista' className={className} />
    </figure>
  )
}
