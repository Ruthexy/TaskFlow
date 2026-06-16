import { z } from 'zod'

export const inviteSchema = z.object({
  email: z.string().email('Enter a valid email'),
  role: z.enum(['admin', 'manager', 'member', 'viewer']),
})

export type InviteFormData = z.infer<typeof inviteSchema>
