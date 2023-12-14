import React from 'react'

import { ProgressStepBarItem } from './ProgressStepBarItem'

type StepItem = {
  text?: string
}

export interface ProgressStepBarProps {
  steps: StepItem[]
  currentStep: number
  currentStepProgress?: number
}

export const ProgressStepBar = React.memo(
  ({ currentStep, currentStepProgress, steps }: ProgressStepBarProps) => {
    const stepWith = 100 / steps.length
    const activeStepProgress = `${currentStepProgress ?? 0}%`

    return (
      <div className='flex'>
        {steps.map(({ text }, i) => {
          const step = i + 1
          const isActive = currentStep >= step
          const isNext = currentStep + 1 === step
          const progress = isActive ? '100%' : isNext ? activeStepProgress : '0%'

          return (
            <ProgressStepBarItem
              key={`${text}_${step}`}
              text={text}
              stepWidth={`${stepWith}%`}
              stepNumber={step}
              active={isActive}
              progress={progress}
            />
          )
        })}
      </div>
    )
  }
)

ProgressStepBar.displayName = 'ProgressStepBar'
