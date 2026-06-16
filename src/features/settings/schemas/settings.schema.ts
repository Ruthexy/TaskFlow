import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  timezone: z.string(),
})

export const workspaceSchema = z.object({
  name: z.string().min(2, 'Workspace name required'),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Use only lowercase letters, numbers, and hyphens'),
})

export type ProfileFormData = z.infer<typeof profileSchema>
export type WorkspaceFormData = z.infer<typeof workspaceSchema>
