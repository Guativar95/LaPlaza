import { inventoryApi } from '@/api/inventoryApi'

export const sendRecoveryLinkByEmail = (email: string) => {
  return inventoryApi.get<boolean>(`/Account/SendEmailPasswordRecovery/${email}`)
}
