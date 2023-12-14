import { z } from 'zod'

import v from '@/utils/zodValidations'

export const multiObservationSchema = z.object({
  providerId: v.selectString(),
  observations: z
    .array(
      z.object({
        descriptionId: v.selectString(),
      })
    )
    .min(1, 'Debe agregar al menos una observación'),
})

export type MultiObservationValues = z.infer<typeof multiObservationSchema>
