import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { CheckSquare } from 'lucide-react'

export function AuthLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen flex">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center gap-2 justify-center mb-8">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">TaskFlow</span>
          </div>
          <Outlet />
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/10 via-primary/5 to-background flex-col items-center justify-center p-12">
        <div className="max-w-md text-center space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Active Projects', value: '12', delta: '+8.2%' },
              { label: 'Tasks Completed', value: '176', delta: '+4.7%' },
              { label: 'Team Members', value: '6', delta: 'Across 4 roles' },
              { label: 'On-time Delivery', value: '89%', delta: '+27% since W1' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-background p-4 text-left shadow-sm">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                <p className="text-xs text-emerald-600 mt-1">{stat.delta}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Ship faster. Stay aligned.
            </h2>
            <p className="text-muted-foreground text-sm">
              TaskFlow brings your team's work together in one place — projects, tasks,
              boards, and insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
