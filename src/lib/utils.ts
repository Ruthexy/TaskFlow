import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ProjectStatus, TaskPriority, TaskStatus, WorkspaceRole } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(dateStr)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getAvatarColor(name: string): string {
  const colors = [
    'bg-blue-500',
    'bg-violet-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-rose-500',
    'bg-cyan-500',
    'bg-fuchsia-500',
    'bg-orange-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export const PROJECT_STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  active: { label: 'Active', className: 'bg-emerald-100 text-emerald-700' },
  planning: { label: 'Planning', className: 'bg-blue-100 text-blue-700' },
  at_risk: { label: 'At Risk', className: 'bg-amber-100 text-amber-700' },
  completed: { label: 'Completed', className: 'bg-slate-100 text-slate-600' },
  archived: { label: 'Archived', className: 'bg-slate-100 text-slate-500' },
}

export const TASK_PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; className: string; dotColor: string }
> = {
  urgent: {
    label: 'Urgent',
    className: 'bg-red-100 text-red-700',
    dotColor: 'bg-red-500',
  },
  high: {
    label: 'High',
    className: 'bg-orange-100 text-orange-700',
    dotColor: 'bg-orange-500',
  },
  medium: {
    label: 'Medium',
    className: 'bg-blue-100 text-blue-700',
    dotColor: 'bg-blue-500',
  },
  low: {
    label: 'Low',
    className: 'bg-slate-100 text-slate-600',
    dotColor: 'bg-slate-400',
  },
}

export const TASK_STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; className: string }
> = {
  backlog: { label: 'Backlog', className: 'bg-slate-100 text-slate-600' },
  todo: { label: 'To Do', className: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'In Progress', className: 'bg-violet-100 text-violet-700' },
  review: { label: 'Review', className: 'bg-amber-100 text-amber-700' },
  done: { label: 'Done', className: 'bg-emerald-100 text-emerald-700' },
}

export const ROLE_CONFIG: Record<WorkspaceRole, { label: string; className: string }> = {
  owner: { label: 'Owner', className: 'bg-violet-100 text-violet-700' },
  admin: { label: 'Admin', className: 'bg-blue-100 text-blue-700' },
  manager: { label: 'Manager', className: 'bg-emerald-100 text-emerald-700' },
  member: { label: 'Member', className: 'bg-slate-100 text-slate-600' },
  viewer: { label: 'Viewer', className: 'bg-slate-100 text-slate-500' },
}

export function getProgressColor(progress: number): string {
  if (progress >= 80) return 'bg-emerald-500'
  if (progress >= 40) return 'bg-amber-500'
  return 'bg-red-500'
}
