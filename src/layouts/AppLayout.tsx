import { Outlet, Navigate, NavLink, Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FolderKanban, Kanban, Calendar, Users,
  Bell, BarChart3, Settings, Search, ChevronDown, CheckSquare,
  Plus, Star, LogOut, User, Menu
} from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useWorkspaceStore } from '@/stores/workspaceStore'
import { useUIStore } from '@/stores/uiStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { CommandPalette } from '@/features/search/components/CommandPalette'
import { Avatar } from '@/components/shared/Avatar'
import { DropdownMenu, DropdownItem, DropdownSeparator } from '@/components/ui/dropdown'
import { cn } from '@/lib/utils'
import { MOCK_PROJECTS } from '@/lib/mockData'

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/board', icon: Kanban, label: 'Boards' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/team', icon: Users, label: 'Team' },
  { to: '/notifications', icon: Bell, label: 'Notifications' },
  { to: '/reports', icon: BarChart3, label: 'Reports' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export function AppLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const workspace = useWorkspaceStore((s) => s.workspace)
  const { sidebarOpen, toggleSidebar, openCommandPalette } = useUIStore()
  const unreadCount = useNotificationStore((s) => s.unreadCount)
  const navigate = useNavigate()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  const favorites = MOCK_PROJECTS.filter((p) => p.isFavorited)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          'flex flex-col border-r bg-sidebar-background transition-all duration-200 shrink-0',
          sidebarOpen ? 'w-60' : 'w-0 overflow-hidden border-0'
        )}
      >
        {/* Workspace header */}
        <div className="flex h-14 items-center gap-2 px-4 border-b shrink-0">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <CheckSquare className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">TaskFlow</p>
            <p className="text-xs text-muted-foreground truncate">
              {workspace?.name} · {workspace?.plan === 'pro' ? 'Pro' : 'Free'}
            </p>
          </div>
        </div>

        {/* User + Search */}
        <div className="px-3 pt-3 space-y-1 shrink-0">
          <DropdownMenu
            align="left"
            trigger={
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent transition-colors">
                {user && <Avatar name={user.name} size="sm" />}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            }
          >
            <DropdownItem icon={<User className="h-4 w-4" />} onClick={() => navigate('/settings/profile')}>
              Profile
            </DropdownItem>
            <DropdownItem icon={<Settings className="h-4 w-4" />} onClick={() => navigate('/settings')}>
              Settings
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem icon={<LogOut className="h-4 w-4" />} onClick={logout} destructive>
              Log out
            </DropdownItem>
          </DropdownMenu>

          <button
            onClick={openCommandPalette}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search</span>
            <kbd className="text-xs bg-muted rounded px-1 py-0.5">⌘K</kbd>
          </button>

          <button
            onClick={() => {}}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New</span>
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors relative group',
                  isActive
                    ? 'bg-sidebar-accent text-foreground font-medium'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {label === 'Notifications' && unreadCount > 0 && (
                <span className="h-5 min-w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center px-1">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Favorites */}
        {favorites.length > 0 && (
          <div className="px-3 pb-4 shrink-0">
            <p className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Favorites
            </p>
            {favorites.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
              >
                <Star className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                <span className="truncate">{project.name}</span>
              </Link>
            ))}
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 items-center gap-3 border-b px-4 bg-background shrink-0">
          <button
            onClick={toggleSidebar}
            className="rounded-md p-1.5 hover:bg-accent transition-colors text-muted-foreground"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <button
            onClick={openCommandPalette}
            className="hidden md:flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-muted-foreground hover:bg-accent transition-colors"
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="text-xs bg-muted rounded px-1">⌘K</kbd>
          </button>

          <Link
            to="/notifications"
            className="relative rounded-md p-1.5 hover:bg-accent transition-colors text-muted-foreground"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>

          <DropdownMenu
            trigger={
              <button className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-accent transition-colors">
                {user && <Avatar name={user.name} size="sm" />}
              </button>
            }
          >
            <DropdownItem icon={<User className="h-4 w-4" />} onClick={() => navigate('/settings/profile')}>
              Profile
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem icon={<LogOut className="h-4 w-4" />} onClick={logout} destructive>
              Log out
            </DropdownItem>
          </DropdownMenu>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Command palette — must live inside the router for useNavigate */}
      <CommandPalette />
    </div>
  )
}
