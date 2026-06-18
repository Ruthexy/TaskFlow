import { memo } from 'react'
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

export const KanbanCard = memo(function KanbanCard({
  task,
  onClick,
  isDragOverlay = false,
}: KanbanCardProps) {
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
    // Suppress transition during active drag so the card follows the cursor
    // instantly; re-enable it for the drop animation.
    transition: isDragging ? undefined : transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        // Base card
        'group relative rounded-lg border bg-background p-3 shadow-sm',
        'transition-all duration-150 ease-out',
        // Hover — only when not being dragged
        !isDragging && !isDragOverlay && 'hover:shadow-md hover:border-primary/30',
        // Ghost placeholder left behind during drag
        isDragging && 'opacity-30 scale-[0.97] shadow-none',
        // Floating overlay
        isDragOverlay && [
          'shadow-2xl border-primary/40',
          'rotate-[1.5deg] scale-[1.04]',
          'cursor-grabbing ring-2 ring-primary/20',
        ]
      )}
      onClick={() => {
        if (!isDragging) onClick(task)
      }}
    >
      <div className="flex items-start gap-2">
        {/* Drag handle — whole-card drag via attributes+listeners lets touch
            users grab anywhere; the grip icon is a desktop visual hint only. */}
        <button
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
          className={cn(
            'mt-0.5 shrink-0 rounded text-muted-foreground',
            'opacity-0 group-hover:opacity-60 hover:opacity-100! transition-opacity',
            'cursor-grab active:cursor-grabbing focus-visible:opacity-100 focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
            isDragOverlay && 'opacity-60'
          )}
          onClick={(e) => e.stopPropagation()}
          tabIndex={0}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <PriorityBadge priority={task.priority} />
          </div>

          <p className="text-sm font-medium leading-snug mb-2 line-clamp-2">
            {task.title}
          </p>

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
            {task.dueDate ? (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{formatShortDate(task.dueDate)}</span>
              </div>
            ) : (
              <span />
            )}
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
  )
})
