import React from 'react'

import img from './images/cars.png'
import { IconBaseProps } from './type'

export const CarsAdmin: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono lista' className={className} />
    </figure>
  )
}
