import { Link as RDLink, LinkProps } from 'react-router-dom'

export const Link = ({ children, className, ...props }: LinkProps) => {
  return (
    <RDLink className={`text-primary ${className}`} {...props}>
      {children}
    </RDLink>
  )
}
