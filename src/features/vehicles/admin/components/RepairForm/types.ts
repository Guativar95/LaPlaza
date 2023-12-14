import { z } from 'zod'

import v from '@/utils/zodValidations'

import { repairItemSchema } from '../RepairFormItem'

export const repairSchema = z.object({
  providerId: v.selectString(),
  items: z.array(repairItemSchema).min(1, 'Debe agregar al menos un item'),
})

export type RepairValues = z.infer<typeof repairSchema>
