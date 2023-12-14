import { useState } from 'react'

export type UseSteps = {
  active?: number
}

export const useSteps = ({ active = 1 }: UseSteps = {}) => {
  const [activeStep, setActiveStep] = useState(active)
  const nextStep = () => setActiveStep(activeStep + 1)
  const previousStep = () => setActiveStep(activeStep - 1)

  return {
    activeStep,
    nextStep,
    previousStep,
    setActiveStep,
  }
}
