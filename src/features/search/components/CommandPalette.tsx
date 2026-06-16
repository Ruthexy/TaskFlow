import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, FolderKanban, CheckSquare, Users, LayoutDashboard,
  Kanban, Calendar, BarChart3, Settings, Bell, ArrowRight, X,
} from 'lucide-react'
import { useUIStore } from '@/stores/uiStore'
import { getMockSearchResults } from '@/lib/mockData'
import { cn, getInitials, getAvatarColor } from '@/lib/utils'
import type { SearchResult } from '@/types'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: React.ReactNode
  action: () => void
  category: string
}

export function CommandPalette() {
  const { commandPaletteOpen, closeCommandPalette } = useUIStore()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const navigate = useNavigate()

  const go = useCallback(
    (path: string) => {
      navigate(path)
      closeCommandPalette()
      setQuery('')
    },
    [navigate, closeCommandPalette]
  )

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (commandPaletteOpen) closeCommandPalette()
        else useUIStore.getState().openCommandPalette()
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        closeCommandPalette()
        setQuery('')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [commandPaletteOpen, closeCommandPalette])

  useEffect(() => {
    if (query.trim().length >= 1) {
      const r = getMockSearchResults(query)
      setResults(r)
    } else {
      setResults(null)
    }
  }, [query])

  const NAV_ITEMS: CommandItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" />, action: () => go('/'), category: 'Navigate' },
    { id: 'projects', label: 'Projects', icon: <FolderKanban className="h-4 w-4" />, action: () => go('/projects'), category: 'Navigate' },
    { id: 'board', label: 'Boards', icon: <Kanban className="h-4 w-4" />, action: () => go('/board'), category: 'Navigate' },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="h-4 w-4" />, action: () => go('/calendar'), category: 'Navigate' },
    { id: 'team', label: 'Team', icon: <Users className="h-4 w-4" />, action: () => go('/team'), category: 'Navigate' },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" />, action: () => go('/notifications'), category: 'Navigate' },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="h-4 w-4" />, action: () => go('/reports'), category: 'Navigate' },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" />, action: () => go('/settings'), category: 'Navigate' },
  ]

  if (!commandPaletteOpen) return null

  const hasResults = results && (
    results.tasks.length > 0 || results.projects.length > 0 || results.members.length > 0
  )

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => { closeCommandPalette(); setQuery('') }}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-xl mx-4 rounded-xl border bg-background shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks, projects, people..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="shrink-0 rounded border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {/* Search results */}
          {hasResults && (
            <div className="p-2 space-y-1">
              {results!.projects.length > 0 && (
                <Section label="Projects">
                  {results!.projects.map((p) => (
                    <ResultRow
                      key={p.id}
                      icon={<FolderKanban className="h-4 w-4 text-blue-500" />}
                      label={p.name}
                      description={p.status}
                      onClick={() => go(`/projects/${p.id}`)}
                    />
                  ))}
                </Section>
              )}
              {results!.tasks.length > 0 && (
                <Section label="Tasks">
                  {results!.tasks.map((t) => (
                    <ResultRow
                      key={t.id}
                      icon={<CheckSquare className="h-4 w-4 text-emerald-500" />}
                      label={t.title}
                      description={t.priority}
                      onClick={() => go('/board')}
                    />
                  ))}
                </Section>
              )}
              {results!.members.length > 0 && (
                <Section label="People">
                  {results!.members.map((m) => (
                    <ResultRow
                      key={m.id}
                      icon={
                        <span className={cn(
                          'inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shrink-0',
                          getAvatarColor(m.name)
                        )}>
                          {getInitials(m.name)}
                        </span>
                      }
                      label={m.name}
                      description={m.email}
                      onClick={() => go('/team')}
                    />
                  ))}
                </Section>
              )}
            </div>
          )}

          {/* Default: navigation shortcuts */}
          {!query && (
            <div className="p-2">
              <Section label="Quick navigation">
                {NAV_ITEMS.map((item) => (
                  <ResultRow
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    onClick={item.action}
                  />
                ))}
              </Section>
            </div>
          )}

          {/* No results */}
          {query && !hasResults && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-8 w-8 text-muted-foreground mb-3" />
              <p className="text-sm font-medium">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-muted-foreground mt-1">
                Try searching for a task title, project name, or team member.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-2 flex items-center gap-4 text-xs text-muted-foreground bg-muted/30">
          <span className="flex items-center gap-1"><kbd className="rounded border bg-background px-1">↑↓</kbd> navigate</span>
          <span className="flex items-center gap-1"><kbd className="rounded border bg-background px-1">↵</kbd> select</span>
          <span className="flex items-center gap-1"><kbd className="rounded border bg-background px-1">ESC</kbd> close</span>
        </div>
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </p>
      {children}
    </div>
  )
}

function ResultRow({
  icon, label, description, onClick,
}: {
  icon: React.ReactNode
  label: string
  description?: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-accent transition-colors group"
    >
      <span className="shrink-0 text-muted-foreground">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{label}</p>
        {description && (
          <p className="text-xs text-muted-foreground truncate capitalize">{description}</p>
        )}
      </div>
      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  )
}
