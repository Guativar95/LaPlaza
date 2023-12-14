import { inventoryApi } from '@/api/inventoryApi'

export const getRate = () => {
  return inventoryApi.get<number>('/Vehicle/GetRate')
}
