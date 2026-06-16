import { Link } from 'react-router-dom'
import { Calendar, CheckCircle2, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProjectStatusBadge } from '@/components/shared/StatusBadge'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { AvatarStack } from '@/components/shared/Avatar'
import { formatShortDate, cn } from '@/lib/utils'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const initial = project.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {initial}
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">{project.name}</h3>
              {project.dueDate && (
                <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatShortDate(project.dueDate)}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {project.isFavorited && <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />}
            <ProjectStatusBadge status={project.status} />
          </div>
        </div>

        {project.description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
        )}

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle2 className={cn('h-3 w-3', project.progress === 100 ? 'text-emerald-500' : 'text-muted-foreground')} />
                {project.completedTasks}/{project.totalTasks} tasks
              </span>
            </span>
            <span className="text-xs font-medium">{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} />
        </div>

        <div className="flex items-center justify-between">
          <AvatarStack members={project.members} max={4} />
          <Link to={`/projects/${project.id}`}>
            <Button variant="outline" size="sm">
              Open
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
