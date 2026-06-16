import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Workspace } from '@/types'
import { MOCK_WORKSPACE } from '@/lib/mockData'

interface WorkspaceState {
  workspace: Workspace | null
  setWorkspace: (workspace: Workspace) => void
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspace: MOCK_WORKSPACE,
      setWorkspace: (workspace) => set({ workspace }),
    }),
    { name: 'taskflow-workspace' }
  )
)
