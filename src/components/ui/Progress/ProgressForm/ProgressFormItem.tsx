import React, { ReactElement, useEffect, useRef } from 'react'

import { useProgressForm } from '../ProgressFormContext'

export interface ProgressFormItemProps {
  children: ReactElement
}

export const ProgressFormItem: React.FC<ProgressFormItemProps> = ({ children }) => {
  const idRef = useRef<number>()
  const { subscribe, activeStep } = useProgressForm()

  useEffect(() => {
    idRef.current = subscribe()
  }, [])

  if (activeStep !== idRef.current) return null

  return children
}
