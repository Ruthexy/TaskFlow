import { z } from 'zod'

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['active', 'planning', 'at_risk', 'completed', 'archived']),
  dueDate: z.string().optional(),
})

export type ProjectFormData = z.infer<typeof projectSchema>
