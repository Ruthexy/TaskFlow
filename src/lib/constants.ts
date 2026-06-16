export const QUERY_STALE_TIMES = {
  user: 1000 * 60 * 5,
  projects: 1000 * 60 * 2,
  tasks: 1000 * 30,
  board: 1000 * 15,
  notifications: 1000 * 60,
  reports: 1000 * 60 * 10,
  team: 1000 * 60 * 5,
  calendar: 1000 * 60 * 2,
} as const

export const KANBAN_COLUMNS = [
  { id: 'backlog', name: 'Backlog', status: 'backlog' },
  { id: 'todo', name: 'To Do', status: 'todo' },
  { id: 'in_progress', name: 'In Progress', status: 'in_progress' },
  { id: 'review', name: 'Review', status: 'review' },
  { id: 'done', name: 'Done', status: 'done' },
] as const

export const WORKSPACE_ROLES = [
  { value: 'owner', label: 'Owner' },
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'member', label: 'Member' },
  { value: 'viewer', label: 'Viewer' },
] as const

export const PROJECT_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'planning', label: 'Planning' },
  { value: 'at_risk', label: 'At Risk' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' },
] as const

export const TASK_PRIORITIES = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
] as const

export const TASK_STATUSES = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'Review' },
  { value: 'done', label: 'Done' },
] as const
