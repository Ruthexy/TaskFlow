import { useState, useCallback } from 'react'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import type { KanbanColumn, Task } from '@/types'
import { getMockKanbanColumns } from '@/lib/mockData'

export function useBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>(getMockKanbanColumns())
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const task = columns
      .flatMap((c) => c.tasks)
      .find((t) => t.id === event.active.id)
    setActiveTask(task ?? null)
  }, [columns])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over || active.id === over.id) return

    const activeId = String(active.id)
    const overId = String(over.id)

    setColumns((prev) => {
      const newColumns = prev.map((col) => ({ ...col, tasks: [...col.tasks] }))

      const sourceColIdx = newColumns.findIndex((c) => c.tasks.some((t) => t.id === activeId))
      if (sourceColIdx === -1) return prev

      const taskIdx = newColumns[sourceColIdx].tasks.findIndex((t) => t.id === activeId)
      const [movedTask] = newColumns[sourceColIdx].tasks.splice(taskIdx, 1)

      // Check if dropped on a column directly
      const targetColIdx = newColumns.findIndex((c) => c.id === overId)
      if (targetColIdx !== -1) {
        movedTask.columnId = newColumns[targetColIdx].id
        movedTask.status = newColumns[targetColIdx].status
        newColumns[targetColIdx].tasks.push(movedTask)
      } else {
        // Dropped on a task — find its column
        const destColIdx = newColumns.findIndex((c) => c.tasks.some((t) => t.id === overId))
        if (destColIdx === -1) {
          newColumns[sourceColIdx].tasks.splice(taskIdx, 0, movedTask)
          return newColumns
        }
        const destTaskIdx = newColumns[destColIdx].tasks.findIndex((t) => t.id === overId)
        movedTask.columnId = newColumns[destColIdx].id
        movedTask.status = newColumns[destColIdx].status
        newColumns[destColIdx].tasks.splice(destTaskIdx, 0, movedTask)
      }

      // Update task counts
      newColumns.forEach((col) => {
        col.taskCount = col.tasks.length
      })

      return newColumns
    })
  }, [])

  const addTask = useCallback((columnId: string, taskData: Partial<Task>) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== columnId) return col
        const newTask: Task = {
          id: `task-${Date.now()}`,
          projectId: taskData.projectId ?? 'p1',
          title: taskData.title ?? 'New Task',
          description: null,
          status: col.status,
          priority: taskData.priority ?? 'medium',
          assigneeId: taskData.assigneeId ?? null,
          assignee: null,
          dueDate: taskData.dueDate ?? null,
          tags: taskData.tags ?? [],
          columnId,
          order: col.tasks.length,
          createdById: 'u1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        return {
          ...col,
          tasks: [...col.tasks, newTask],
          taskCount: col.taskCount + 1,
        }
      })
    )
  }, [])

  const totalTasks = columns.reduce((sum, c) => sum + c.taskCount, 0)

  return { columns, activeTask, handleDragStart, handleDragEnd, addTask, totalTasks }
}
