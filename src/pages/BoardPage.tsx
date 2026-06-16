import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Plus, SlidersHorizontal } from 'lucide-react'
import { KanbanColumn } from '@/features/board/components/KanbanColumn'
import { KanbanCard } from '@/features/board/components/KanbanCard'
import { useBoard } from '@/features/board/hooks/useBoard'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { Button } from '@/components/ui/button'
import type { Task } from '@/types'

export function BoardPage() {
  const { columns, activeTask, handleDragStart, handleDragEnd, totalTasks } = useBoard()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [defaultColumnId, setDefaultColumnId] = useState<string>('todo')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setTaskModalOpen(true)
  }

  const handleAddTask = (columnId: string) => {
    setSelectedTask(null)
    setDefaultColumnId(columnId)
    setTaskModalOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Board toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-background">
        <div>
          <h1 className="text-xl font-bold">Kanban Board</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {totalTasks} tasks across {columns.length} lanes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </Button>
          <Button size="sm" className="gap-2" onClick={() => handleAddTask('todo')}>
            <Plus className="h-4 w-4" />
            Add task
          </Button>
        </div>
      </div>

      {/* Board content */}
      <div className="flex-1 overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 p-6 min-w-max h-full">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTask}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <KanbanCard
                task={activeTask}
                onClick={() => {}}
                isDragOverlay
              />
            )}
          </DragOverlay>
        </DndContext>
      </div>

      <TaskModal
        open={taskModalOpen}
        onOpenChange={setTaskModalOpen}
        task={selectedTask ?? undefined}
        defaultColumnId={defaultColumnId}
      />
    </div>
  )
}
