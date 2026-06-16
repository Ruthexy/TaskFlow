import { useState } from 'react'
import { Plus } from 'lucide-react'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { NewProjectModal } from '@/features/projects/components/NewProjectModal'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MOCK_PROJECTS } from '@/lib/mockData'
import type { ProjectStatus } from '@/types'

type Filter = 'all' | ProjectStatus

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'planning', label: 'Planning' },
  { value: 'at_risk', label: 'At Risk' },
  { value: 'completed', label: 'Completed' },
]

export function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [newProjectOpen, setNewProjectOpen] = useState(false)

  const filtered = filter === 'all'
    ? MOCK_PROJECTS
    : MOCK_PROJECTS.filter((p) => p.status === filter)

  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Plan, organize, and ship work across your teams.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1 rounded-lg border bg-muted/30 p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-all',
                filter === f.value
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Button onClick={() => setNewProjectOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New project
        </Button>
      </div>

      {/* Project grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-sm text-muted-foreground">No projects match this filter.</p>
          <Button variant="outline" className="mt-3" onClick={() => setFilter('all')}>
            Clear filter
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <NewProjectModal open={newProjectOpen} onOpenChange={setNewProjectOpen} />
    </div>
  )
}
