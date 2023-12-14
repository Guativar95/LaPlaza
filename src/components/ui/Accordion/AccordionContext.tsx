import React, { createContext, ReactNode, useContext, useRef, useState } from 'react'

export interface ItemsState {
  id: number
  expanded: boolean
}
export interface AccordionContextInterface {
  subscribe: () => number
  closeAll: () => void
  builder: (id: number) => {
    get: () => ItemsState
    set: (val: boolean, rest?: boolean) => void
    toggle: () => void
  }
}
export interface AccordionProviderProps {
  children: ReactNode
}

export const AccodionContext = createContext({} as AccordionContextInterface)
export const useAccordion = () => useContext(AccodionContext)

export const AccordionProvider: React.FC<AccordionProviderProps> = ({ children }) => {
  const value = useProvideAccordion()
  return <AccodionContext.Provider value={value}>{children}</AccodionContext.Provider>
}

function useProvideAccordion(): AccordionContextInterface {
  const lastIdRef = useRef(0)
  const [items, setItems] = useState<ItemsState[]>([])

  const subscribe = () => {
    const id = lastIdRef.current + 1
    const newItem = {
      id,
      expanded: false,
    }

    lastIdRef.current = id
    setItems((i) => [...i, newItem])

    return id
  }

  const closeAll = () => {
    const newItems = items.map((item) => ({
      id: item.id,
      expanded: false,
    }))

    setItems(newItems)
  }

  const builder = (id: number) => {
    return {
      get: () => items.find((i) => i.id === id) || { id, expanded: false },
      set: (val: boolean, rest: boolean = false) => {
        const newItems = items.map((item) => ({
          id: item.id,
          expanded: item.id === id ? val : rest,
        }))

        setItems(newItems)
      },
      toggle: () => {
        const newItems = items.map((item) => ({
          id: item.id,
          expanded: item.id === id ? !item.expanded : false,
        }))

        setItems(newItems)
      },
    }
  }

  return {
    closeAll,
    subscribe,
    builder,
  }
}
