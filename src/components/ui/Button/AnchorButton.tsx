import clsx from 'clsx'

import { colors, common, sizes } from './cls'
import { AnchorButtonProps } from './types'

export const AnchorButton = ({
  variant = 'filled',
  color = 'primary',
  size = 'md',
  startIcon,
  endIcon,
  children,
  className = '',
  ...props
}: AnchorButtonProps) => {
  return (
    <a className={clsx(common, colors[color][variant], sizes[size], className)} {...props}>
      {startIcon}
      <span className='mx-2'>{children}</span>
      {endIcon}
    </a>
  )
}
