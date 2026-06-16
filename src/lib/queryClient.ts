import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30,
    },
    mutations: {
      retry: 0,
    },
  },
})

export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  projects: {
    all: (filters?: Record<string, unknown>) =>
      ['projects', filters] as const,
    detail: (id: string) => ['projects', id] as const,
    tasks: (id: string) => ['projects', id, 'tasks'] as const,
  },
  tasks: {
    all: (filters?: Record<string, unknown>) => ['tasks', filters] as const,
    detail: (id: string) => ['tasks', id] as const,
  },
  board: {
    columns: (projectId?: string) =>
      ['board', projectId ?? 'global'] as const,
  },
  calendar: {
    events: (month: number, year: number) =>
      ['calendar', month, year] as const,
  },
  team: {
    members: ['team', 'members'] as const,
    member: (id: string) => ['team', id] as const,
  },
  notifications: {
    all: (filter?: string) => ['notifications', filter ?? 'all'] as const,
    unreadCount: ['notifications', 'unread-count'] as const,
  },
  reports: {
    overview: (period: string) => ['reports', 'overview', period] as const,
  },
  search: {
    results: (query: string) => ['search', query] as const,
  },
  dashboard: {
    data: ['dashboard'] as const,
  },
} as const
