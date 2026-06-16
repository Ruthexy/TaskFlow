import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { MOCK_USER } from '@/lib/mockData'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, _password: string) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (_email: string, _password: string) => {
        set({ isLoading: true })
        await new Promise((r) => setTimeout(r, 800))
        set({ user: MOCK_USER, isAuthenticated: true, isLoading: false })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      setUser: (user: User) => {
        set({ user })
      },
    }),
    {
      name: 'taskflow-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
