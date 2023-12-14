import { inventoryApi } from '@/api/inventoryApi'

export const getImageByName = (name: string) => {
  return inventoryApi.get<Blob>(`/Image/GetFileImage/${name}`, {
    responseType: 'blob',
  })
}
