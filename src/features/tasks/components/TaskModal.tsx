import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody,
} from '@/components/ui/dialog'
import { TaskForm } from './TaskForm'
import type { Task } from '@/types'
import type { TaskFormData } from '../schemas/task.schema'

interface TaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
  defaultColumnId?: string
  onSuccess?: () => void
}

export function TaskModal({ open, onOpenChange, task, onSuccess }: TaskModalProps) {
  const handleSubmit = (_data: TaskFormData) => {
    onOpenChange(false)
    onSuccess?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} size="lg">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit task' : 'Create new task'}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <TaskForm
            defaultValues={task}
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
