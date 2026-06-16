import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { PriorityBadge, TaskStatusBadge } from '@/components/shared/StatusBadge'
import { Avatar } from '@/components/shared/Avatar'
import { Button } from '@/components/ui/button'
import { formatShortDate } from '@/lib/utils'
import { MOCK_TASKS } from '@/lib/mockData'
import type { Project, Task } from '@/types'

export function ProjectTasksPage() {
  const { project } = useOutletContext<{ project: Project }>()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const tasks = MOCK_TASKS.filter((t) => t.projectId === project.id)

  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{tasks.length} tasks</p>
        <Button size="sm" className="gap-1.5 text-xs" onClick={() => { setSelectedTask(null); setModalOpen(true) }}>
          <Plus className="h-3.5 w-3.5" /> Add task
        </Button>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs">Title</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs">Status</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs">Priority</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs">Assignee</th>
              <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs">Due date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => { setSelectedTask(task); setModalOpen(true) }}
              >
                <td className="px-4 py-3 font-medium">{task.title}</td>
                <td className="px-4 py-3"><TaskStatusBadge status={task.status} /></td>
                <td className="px-4 py-3"><PriorityBadge priority={task.priority} /></td>
                <td className="px-4 py-3">
                  {task.assignee ? (
                    <div className="flex items-center gap-2">
                      <Avatar name={task.assignee.name} size="xs" />
                      <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {task.dueDate ? formatShortDate(task.dueDate) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {tasks.length === 0 && (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No tasks yet. Add your first task above.
          </div>
        )}
      </div>

      <TaskModal open={modalOpen} onOpenChange={setModalOpen} task={selectedTask ?? undefined} />
    </div>
  )
}
