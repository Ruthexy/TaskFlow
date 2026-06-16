import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Calendar, GripVertical } from 'lucide-react'
import { PriorityBadge } from '@/components/shared/StatusBadge'
import { Avatar } from '@/components/shared/Avatar'
import { formatShortDate, cn } from '@/lib/utils'
import type { Task } from '@/types'

interface KanbanCardProps {
  task: Task
  onClick: (task: Task) => void
  isDragOverlay?: boolean
}

export function KanbanCard({ task, onClick, isDragOverlay }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group rounded-lg border bg-background p-3 shadow-sm cursor-pointer',
        'hover:shadow-md hover:border-primary/30 transition-all',
        isDragging && 'opacity-40',
        isDragOverlay && 'shadow-lg rotate-1 border-primary/30'
      )}
      onClick={() => onClick(task)}
    >
      <div className="flex items-start gap-2">
        <button
          {...attributes}
          {...listeners}
          className="mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <PriorityBadge priority={task.priority} />
          </div>

          <p className="text-sm font-medium leading-snug mb-2">{task.title}</p>

          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatShortDate(task.dueDate)}</span>
              </div>
            )}
            <div className="ml-auto">
              {task.assignee && (
                <Avatar
                  name={task.assignee.name}
                  avatarUrl={task.assignee.avatarUrl}
                  size="xs"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
