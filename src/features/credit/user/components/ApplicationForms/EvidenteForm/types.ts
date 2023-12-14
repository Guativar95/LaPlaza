import { z } from 'zod'

export const evidenteSchema = z.object({
  questions: z.array(
    z.object({
      answerId: z
        .string({ invalid_type_error: 'Debe seleccionar una respuesta' })
        .min(1, 'Debe seleccionar una respuesta'),
      questionId: z.string(),
    })
  ),
})

export type EvidenteValues = z.infer<typeof evidenteSchema>
