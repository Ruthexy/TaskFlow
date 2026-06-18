import { useState } from 'react'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DropAnimation } from '@dnd-kit/core'
import { defaultDropAnimationSideEffects } from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Plus, SlidersHorizontal } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { KanbanColumn } from '@/features/board/components/KanbanColumn'
import { KanbanCard } from '@/features/board/components/KanbanCard'
import { useBoardDragDrop } from '@/features/board/hooks/useBoardDragDrop'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import type { Task, Project } from '@/types'

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: { active: { opacity: '0.3' } },
  }),
  duration: 200,
  easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
}

export function ProjectBoardPage() {
  useOutletContext<{ project: Project }>()
  const { addToast } = useToast()
  const {
    columns,
    activeTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    totalTasks,
  } = useBoardDragDrop((msg) => addToast(msg, 'error'))

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [defaultColumnId, setDefaultColumnId] = useState('todo')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setTaskModalOpen(true)
  }

  const handleAddTask = (colId: string) => {
    setSelectedTask(null)
    setDefaultColumnId(colId)
    setTaskModalOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-3 border-b bg-muted/20">
        <p className="text-xs text-muted-foreground">
          Kanban board · {totalTasks} tasks across {columns.length} lanes
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
          </Button>
          <Button size="sm" className="gap-1.5 text-xs" onClick={() => handleAddTask('todo')}>
            <Plus className="h-3.5 w-3.5" />
            Add task
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-4 p-6 min-w-max h-full">
            {columns.map((col) => (
              <KanbanColumn
                key={col.id}
                column={col}
                onTaskClick={handleTaskClick}
                onAddTask={handleAddTask}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={dropAnimation}>
            {activeTask && (
              <KanbanCard task={activeTask} onClick={() => {}} isDragOverlay />
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
