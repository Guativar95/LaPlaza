import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { RequestTypes, SelectInventory, UserRequestType } from '@vehicles/common'

import { getEstimateTypes } from '../api/getEstimateTypes'
import { getProvidersByRequestType } from '../api/getProviders'

export type RepairContextValue = {
  estimates: SelectInventory[]
  providers: UserRequestType[]
  fetchEstimates: () => void
  fetchProviders: () => void
}

export const RepairContext = createContext<RepairContextValue>({} as RepairContextValue)
export const useRepairContext = () => useContext(RepairContext)

export type RepairProvierProps = {
  children: ReactNode
}
export const RepairProvier: FC<RepairProvierProps> = ({ children }) => {
  const [estimates, setEstimates] = useState<SelectInventory[]>([])
  const [providers, setProviders] = useState<UserRequestType[]>([])

  const fetchEstimates = async () => {
    const { data } = await getEstimateTypes()
    setEstimates(data)
  }

  const fetchProviders = async () => {
    const { data } = await getProvidersByRequestType(RequestTypes.repair)
    setProviders(data)
  }

  useEffect(() => {
    Promise.all([getEstimateTypes(), getProvidersByRequestType(RequestTypes.repair)]).then(
      ([estimates, providers]) => {
        setEstimates(estimates.data)
        setProviders(providers.data)
      }
    )
  }, [])

  return (
    <RepairContext.Provider value={{ estimates, providers, fetchEstimates, fetchProviders }}>
      {children}
    </RepairContext.Provider>
  )
}
