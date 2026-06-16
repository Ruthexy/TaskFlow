import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '@/types'

interface UIState {
  sidebarOpen: boolean
  commandPaletteOpen: boolean
  theme: Theme
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  openCommandPalette: () => void
  closeCommandPalette: () => void
  setTheme: (theme: Theme) => void
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  if (theme === 'system') {
    root.classList.add(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  } else {
    root.classList.add(theme)
  }
}

// System theme change listener — only active while "system" is selected
let systemMediaQuery: MediaQueryList | null = null
let systemListener: (() => void) | null = null

function syncSystemTheme(theme: Theme) {
  if (systemListener && systemMediaQuery) {
    systemMediaQuery.removeEventListener('change', systemListener)
    systemListener = null
  }
  if (theme === 'system') {
    systemMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    systemListener = () => applyTheme('system')
    systemMediaQuery.addEventListener('change', systemListener)
  }
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      commandPaletteOpen: false,
      theme: 'light',

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      openCommandPalette: () => set({ commandPaletteOpen: true }),
      closeCommandPalette: () => set({ commandPaletteOpen: false }),

      setTheme: (theme) => {
        set({ theme })
        applyTheme(theme)
        syncSystemTheme(theme)
      },
    }),
    {
      name: 'taskflow-ui',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme)
          syncSystemTheme(state.theme)
        }
      },
    }
  )
)
