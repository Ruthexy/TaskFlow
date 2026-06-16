import { useParams, Link, NavLink, Outlet, Navigate } from 'react-router-dom'
import { ArrowLeft, Kanban, CheckSquare, Calendar, Settings } from 'lucide-react'
import { MOCK_PROJECTS } from '@/lib/mockData'
import { ProjectStatusBadge } from '@/components/shared/StatusBadge'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { AvatarStack } from '@/components/shared/Avatar'
import { cn } from '@/lib/utils'

const SUB_NAV = [
  { to: 'board', icon: Kanban, label: 'Board' },
  { to: 'tasks', icon: CheckSquare, label: 'Tasks' },
  { to: 'calendar', icon: Calendar, label: 'Calendar' },
  { to: 'settings', icon: Settings, label: 'Settings' },
]

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const project = MOCK_PROJECTS.find((p) => p.id === projectId)

  if (!project) return <Navigate to="/projects" replace />

  return (
    <div className="flex flex-col h-full">
      {/* Project header */}
      <div className="border-b bg-background px-6 py-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-3 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" /> All projects
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
              {project.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{project.name}</h1>
                <ProjectStatusBadge status={project.status} />
              </div>
              {project.description && (
                <p className="text-sm text-muted-foreground mt-0.5">{project.description}</p>
              )}
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 w-40">
                  <ProgressBar value={project.progress} />
                  <span className="text-xs text-muted-foreground shrink-0">{project.progress}%</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {project.completedTasks}/{project.totalTasks} tasks
                </span>
              </div>
            </div>
          </div>
          <AvatarStack members={project.members} max={5} size="sm" />
        </div>

        {/* Sub navigation */}
        <nav className="flex gap-1 mt-4 -mb-4">
          {SUB_NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30'
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Sub-page content */}
      <div className="flex-1 overflow-hidden">
        <Outlet context={{ project }} />
      </div>
    </div>
  )
}
