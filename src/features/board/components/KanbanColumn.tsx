import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { KanbanCard } from './KanbanCard'
import { cn } from '@/lib/utils'
import type { KanbanColumn as KanbanColumnType, Task } from '@/types'

const COLUMN_HEADER_COLORS: Record<string, string> = {
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

export function KanbanColumn({ column, onTaskClick, onAddTask }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <div className={cn(
      'flex flex-col w-72 shrink-0 rounded-xl border bg-muted/30',
      isOver && 'border-primary/50 bg-primary/5'
    )}>
      {/* Column header */}
      <div className="flex items-center gap-2 px-3 py-3 border-b">
        <span className={cn('h-2 w-2 rounded-full shrink-0', COLUMN_HEADER_COLORS[column.id])} />
        <span className="text-sm font-semibold flex-1">{column.name}</span>
        <span className="text-xs text-muted-foreground bg-muted rounded-full px-1.5 py-0.5">
          {column.taskCount}
        </span>
      </div>

      {/* Cards */}
      <div
        ref={setNodeRef}
        className="flex-1 flex flex-col gap-2 p-3 overflow-y-auto min-h-[100px]"
      >
        <SortableContext
          items={column.tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <KanbanCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </SortableContext>
      </div>

      {/* Add task */}
      <button
        onClick={() => onAddTask(column.id)}
        className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors border-t rounded-b-xl"
      >
        <Plus className="h-4 w-4" />
        New task
      </button>
    </div>
  )
}
