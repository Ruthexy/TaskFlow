import { Outlet, NavLink } from 'react-router-dom'
import { User, Building2, Bell, Palette, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'

const SETTINGS_NAV = [
  { to: '/settings/profile', icon: User, label: 'Profile' },
  { to: '/settings/workspace', icon: Building2, label: 'Workspace' },
  { to: '/settings/notifications', icon: Bell, label: 'Notifications' },
  { to: '/settings/appearance', icon: Palette, label: 'Appearance' },
  { to: '/settings/billing', icon: CreditCard, label: 'Billing' },
]

export function SettingsLayout() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account and workspace preferences.
        </p>
      </div>

      <div className="flex gap-8">
        <nav className="w-48 shrink-0">
          <ul className="space-y-1">
            {SETTINGS_NAV.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors',
                      isActive
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
