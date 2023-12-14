import { z } from 'zod'

import v from '@/utils/zodValidations'

export const repairItemSchema = z.object({
  estimationTypeId: v.selectNumber(),
  description: v.string(),
})

export type RepairItemValues = z.infer<typeof repairItemSchema>
