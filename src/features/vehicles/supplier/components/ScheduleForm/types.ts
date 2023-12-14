import { z } from 'zod'

import v from '@/utils/zodValidations'

const previousDayDate = new Date()
previousDayDate.setTime(previousDayDate.getTime() - 24 * 60 * 60 * 1000)

export const scheduleSchema = z.object({
  typeVisitId: v.selectNumber(),
  location: v.string({ required: true, max: 30 }),
  observation: v.string({ required: true, max: 500 }),
  scheduledDate: v.date().min(previousDayDate, 'Debe ser mayor o igual a hoy'),
})

export type ScheduleValues = z.infer<typeof scheduleSchema>
