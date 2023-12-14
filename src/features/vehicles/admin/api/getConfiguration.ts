import { inventoryApi } from '@/api/inventoryApi'
import { InventoryConfiguration } from '@/types'

export interface GetConfigurationParams {
  key: string
}

export const getConfiguration = ({ key }: GetConfigurationParams) => {
  return inventoryApi.get<InventoryConfiguration>(`/configuration/${key}`)
}
