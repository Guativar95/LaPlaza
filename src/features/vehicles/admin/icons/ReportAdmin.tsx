import React from 'react'

import img from './images/report.png'
import { IconBaseProps } from './type'

export const ReportAdmin: React.FC<IconBaseProps> = ({ className }) => {
  return (
    <figure>
      <img src={img} alt='icono lista' className={className} />
    </figure>
  )
}
