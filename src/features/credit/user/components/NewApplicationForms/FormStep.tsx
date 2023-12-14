import { FC, ReactElement } from 'react'

export type FormStepProps = {
  index: number
  active: number
  children: ReactElement
}

export const FormStep: FC<FormStepProps> = ({ index, active, children }) => {
  if (index !== active) return null

  return <div className={index === active ? '' : 'hidden'}>{children}</div>
}
