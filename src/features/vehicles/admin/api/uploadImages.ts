import { inventoryApi } from '@/api/inventoryApi'

export const uploadVehicleImages = (data: FormData) => {
  return inventoryApi.postForm('/Image/UploadImagesVehicle', data)
}
