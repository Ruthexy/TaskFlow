import { arrayMove } from '@dnd-kit/sortable'
import type { KanbanColumn, Task } from '@/types'

export function findColumnOfTask(
  columns: KanbanColumn[],
  taskId: string
): KanbanColumn | undefined {
  return columns.find((col) => col.tasks.some((t) => t.id === taskId))
}

export function isTaskId(columns: KanbanColumn[], id: string): boolean {
  return columns.some((col) => col.tasks.some((t) => t.id === id))
}

export function isColumnId(columns: KanbanColumn[], id: string): boolean {
  return columns.some((col) => col.id === id)
}

/**
 * Moves a task from one column to another, inserting it before `overTaskId`
 * if provided, or appending it to the end of the destination column.
 */
export function moveTaskBetweenColumns(
  columns: KanbanColumn[],
  activeId: string,
  srcColumnId: string,
  destColumnId: string,
  overTaskId?: string
): KanbanColumn[] {
  const srcCol = columns.find((c) => c.id === srcColumnId)
  if (!srcCol) return columns

  const activeTask = srcCol.tasks.find((t) => t.id === activeId)
  if (!activeTask) return columns

  return columns.map((col) => {
    if (col.id === srcColumnId) {
      const tasks = col.tasks.filter((t) => t.id !== activeId)
      return { ...col, tasks, taskCount: tasks.length }
    }

    if (col.id === destColumnId) {
      const updated: Task = {
        ...activeTask,
        columnId: col.id,
        status: col.status,
        updatedAt: new Date().toISOString(),
      }
      let tasks: Task[]
      if (overTaskId) {
        const overIdx = col.tasks.findIndex((t) => t.id === overTaskId)
        tasks = [...col.tasks]
        tasks.splice(overIdx < 0 ? col.tasks.length : overIdx, 0, updated)
      } else {
        tasks = [...col.tasks, updated]
      }
      return { ...col, tasks, taskCount: tasks.length }
    }

    return col
  })
}

/**
 * Reorders a task within the same column using arrayMove.
 */
export function reorderTaskInColumn(
  columns: KanbanColumn[],
  columnId: string,
  activeId: string,
  overId: string
): KanbanColumn[] {
  return columns.map((col) => {
    if (col.id !== columnId) return col
    const activeIdx = col.tasks.findIndex((t) => t.id === activeId)
    const overIdx = col.tasks.findIndex((t) => t.id === overId)
    if (activeIdx === -1 || overIdx === -1) return col
    return { ...col, tasks: arrayMove(col.tasks, activeIdx, overIdx) }
  })
}

/**
 * Stamps a sequential `order` value on every task in every column
 * after a drag operation to keep order consistent for persistence.
 */
export function assignOrdersToColumns(columns: KanbanColumn[]): KanbanColumn[] {
  return columns.map((col) => ({
    ...col,
    tasks: col.tasks.map((task, idx) => ({ ...task, order: idx })),
  }))
}
