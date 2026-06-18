import { useState, useCallback, useRef, useLayoutEffect } from 'react'
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import type { KanbanColumn, Task } from '@/types'
import { getMockKanbanColumns } from '@/lib/mockData'
import {
  findColumnOfTask,
  isTaskId,
  isColumnId,
  moveTaskBetweenColumns,
  reorderTaskInColumn,
  assignOrdersToColumns,
} from '../utils/boardHelpers'

// Replace with a real API client when the backend is ready.
async function persistTaskMove(
  _taskId: string,
  _targetColumnId: string,
  _newOrder: number
): Promise<void> {
  await new Promise<void>((res) => setTimeout(res, 300))
  // Uncomment to test optimistic-rollback:
  // if (Math.random() < 0.15) throw new Error('Network error')
}

export function useBoardDragDrop(onError?: (message: string) => void) {
  const [columns, setColumns] = useState<KanbanColumn[]>(getMockKanbanColumns)
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  // Keep a ref that always mirrors current columns so callbacks have
  // stale-free access without needing columns in their dep arrays.
  const columnsRef = useRef(columns)
  useLayoutEffect(() => {
    columnsRef.current = columns
  }, [columns])

  // Stable ref for the error callback so handleDragEnd needs no dep on it.
  const onErrorRef = useRef(onError)
  useLayoutEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  // Snapshot taken at drag-start; used to roll back on API failure.
  const snapshotRef = useRef<KanbanColumn[] | null>(null)

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const activeId = String(event.active.id)
    const current = columnsRef.current
    const task = current.flatMap((c) => c.tasks).find((t) => t.id === activeId)
    setActiveTask(task ?? null)
    // Shallow-clone each column + its tasks array — enough for rollback.
    snapshotRef.current = current.map((col) => ({ ...col, tasks: [...col.tasks] }))
  }, [])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = String(active.id)
    const overId = String(over.id)
    if (activeId === overId) return

    setColumns((prev) => {
      const srcCol = findColumnOfTask(prev, activeId)
      if (!srcCol) return prev

      if (isTaskId(prev, overId)) {
        const destCol = findColumnOfTask(prev, overId)
        if (!destCol) return prev

        if (srcCol.id === destCol.id) {
          // Same column — reorder in place
          return reorderTaskInColumn(prev, srcCol.id, activeId, overId)
        }
        // Different column — insert before the hovered task
        return moveTaskBetweenColumns(prev, activeId, srcCol.id, destCol.id, overId)
      }

      if (isColumnId(prev, overId) && srcCol.id !== overId) {
        // Hovering over an empty column — append to its end
        return moveTaskBetweenColumns(prev, activeId, srcCol.id, overId)
      }

      return prev
    })
  }, [])

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveTask(null)

    if (!event.over) {
      // Cancelled / dropped outside — revert to snapshot
      if (snapshotRef.current) setColumns(snapshotRef.current)
      snapshotRef.current = null
      return
    }

    // Assign sequential order values before persisting
    const finalColumns = assignOrdersToColumns(columnsRef.current)
    setColumns(finalColumns)

    const activeId = String(event.active.id)
    const movedTask = finalColumns.flatMap((c) => c.tasks).find((t) => t.id === activeId)
    if (!movedTask) {
      snapshotRef.current = null
      return
    }

    const { id, columnId, order } = movedTask
    const snapshot = snapshotRef.current
    snapshotRef.current = null

    ;(async () => {
      try {
        await persistTaskMove(id, columnId, order)
      } catch {
        // Roll back the optimistic update and notify the user
        if (snapshot) setColumns(snapshot)
        onErrorRef.current?.('Failed to save. Your change was reverted.')
      }
    })()
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

  return {
    columns,
    activeTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    addTask,
    totalTasks,
  }
}
