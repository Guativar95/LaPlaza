import { inventoryApi } from '@/api/inventoryApi'

export const uploadDetailRequestImages = (data: FormData) => {
  return inventoryApi.postForm('/Image/UploadImagesDetailRequest', data)
}
