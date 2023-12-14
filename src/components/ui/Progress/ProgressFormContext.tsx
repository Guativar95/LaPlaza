import React, { createContext, ReactNode, useContext, useRef, useState } from 'react'

interface ItemState {
  id: number
}

export interface ProgressFormContextValue {
  subscribe: () => number
  nextStep: () => void
  previousStep: () => void
  activeStep: number
  items: { id: number }[]
  // builder: (id: number) => {
  //   get: () => ItemState
  // }
}
export interface ProgressProviderProps {
  children: ReactNode
  startWith?: number
}

export const ProgressFormContext = createContext({} as ProgressFormContextValue)
export const useProgressForm = () => useContext(ProgressFormContext)

export const ProgressFormProvider: React.FC<ProgressProviderProps> = ({ children, startWith }) => {
  const value = useProvideProgressForm({ startWith: startWith ?? 1 })
  return <ProgressFormContext.Provider value={value}>{children}</ProgressFormContext.Provider>
}

function useProvideProgressForm({ startWith }: { startWith: number }): ProgressFormContextValue {
  const lastIdRef = useRef<number>()
  const [items, setItems] = useState<ItemState[]>([])
  const [activeStep, setActiveStep] = useState(startWith)

  const subscribe = () => {
    const id = lastIdRef.current ? lastIdRef.current + 1 : startWith
    const newItem = {
      id,
    }

    lastIdRef.current = id
    setItems((i) => [...i, newItem])

    return id
  }

  const nextStep = () => setActiveStep((s) => s + 1)
  const previousStep = () => setActiveStep((s) => s - 1)

  // const builder = (id: number) => {
  //   return {
  //     get: () => items.find((i) => i.id === id) || { id },
  //   }
  // }

  return {
    subscribe,
    nextStep,
    previousStep,
    activeStep,
    items,
  }
}
