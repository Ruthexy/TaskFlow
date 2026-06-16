import { z } from 'zod'

export const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(200),
  description: z.string().max(2000).optional(),
  status: z.enum(['backlog', 'todo', 'in_progress', 'review', 'done']),
  priority: z.enum(['urgent', 'high', 'medium', 'low']),
  assigneeId: z.string().optional(),
  dueDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export type TaskFormData = z.infer<typeof taskSchema>
