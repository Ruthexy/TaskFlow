import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProjectStatusBadge } from '@/components/shared/StatusBadge'
import { ProgressBar } from '@/components/shared/ProgressBar'
import type { ProjectStatus } from '@/types'

interface ProjectProgressItem {
  id: string
  name: string
  status: ProjectStatus
  progress: number
}

interface ProjectProgressListProps {
  projects: ProjectProgressItem[]
}

export function ProjectProgressList({ projects }: ProjectProgressListProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {projects.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className="block group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium group-hover:text-primary transition-colors truncate flex-1 mr-2">
                {project.name}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <ProjectStatusBadge status={project.status} />
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {project.progress}%
                </span>
              </div>
            </div>
            <ProgressBar value={project.progress} />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
