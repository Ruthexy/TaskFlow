import { memo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { KanbanCard } from './KanbanCard'
import { cn } from '@/lib/utils'
import type { KanbanColumn as KanbanColumnType, Task } from '@/types'

const COLUMN_DOT: Record<string, string> = {
  backlog: 'bg-slate-400',
  todo: 'bg-blue-500',
  in_progress: 'bg-violet-500',
  review: 'bg-amber-500',
  done: 'bg-emerald-500',
}

interface KanbanColumnProps {
  column: KanbanColumnType
  onTaskClick: (task: Task) => void
  onAddTask: (columnId: string) => void
}

export const KanbanColumn = memo(function KanbanColumn({
  column,
  onTaskClick,
  onAddTask,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <div
      className={cn(
        'flex flex-col w-72 shrink-0 rounded-xl border bg-muted/30',
        'transition-colors duration-200',
        isOver && 'border-primary/50 bg-primary/5 ring-1 ring-primary/20'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-3 border-b">
        <span
          className={cn(
            'h-2 w-2 rounded-full shrink-0',
            COLUMN_DOT[column.id] ?? 'bg-muted-foreground'
          )}
        />
        <span className="text-sm font-semibold flex-1">{column.name}</span>
        <span className="text-xs text-muted-foreground bg-muted rounded-full px-1.5 py-0.5 tabular-nums">
          {column.taskCount}
        </span>
      </div>

      {/* Drop zone + cards */}
      <div
        ref={setNodeRef}
        className="flex flex-col gap-2 p-3 flex-1 overflow-y-auto"
        style={{ minHeight: 120 }}
      >
        <SortableContext
          items={column.tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <KanbanCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>

        {/* Empty-column drop target — visible only when the column has no tasks
            or when a card is being dragged over this (empty) column. */}
        {column.tasks.length === 0 && (
          <div
            className={cn(
              'flex-1 rounded-lg border-2 border-dashed',
              'flex items-center justify-center',
              'text-xs text-muted-foreground select-none',
              'transition-colors duration-150',
              isOver
                ? 'border-primary/50 bg-primary/5 text-primary'
                : 'border-muted-foreground/20'
            )}
            style={{ minHeight: 80 }}
          >
            {isOver ? 'Release to drop' : 'No tasks'}
          </div>
        )}
      </div>

      {/* Add task */}
      <button
        onClick={() => onAddTask(column.id)}
        className={cn(
          'flex items-center gap-2 px-3 py-2.5 border-t rounded-b-xl',
          'text-sm text-muted-foreground',
          'hover:text-foreground hover:bg-accent transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset'
        )}
      >
        <Plus className="h-4 w-4" />
        New task
      </button>
    </div>
  )
})
