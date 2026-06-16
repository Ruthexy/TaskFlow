import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskSchema, type TaskFormData } from '../schemas/task.schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { TASK_STATUSES, TASK_PRIORITIES } from '@/lib/constants'
import { MOCK_TEAM_MEMBERS } from '@/lib/mockData'
import type { Task } from '@/types'

interface TaskFormProps {
  defaultValues?: Partial<Task>
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

const ASSIGNEE_OPTIONS = [
  { value: '', label: 'Unassigned' },
  ...MOCK_TEAM_MEMBERS.map((m) => ({ value: m.userId, label: m.name })),
]

export function TaskForm({ defaultValues, onSubmit, onCancel, isLoading }: TaskFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      status: defaultValues?.status ?? 'todo',
      priority: defaultValues?.priority ?? 'medium',
      assigneeId: defaultValues?.assigneeId ?? '',
      dueDate: defaultValues?.dueDate ?? '',
      tags: defaultValues?.tags ?? [],
    },
  })

  const status = watch('status')
  const priority = watch('priority')
  const assigneeId = watch('assigneeId')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Task title *</Label>
        <Input id="title" placeholder="e.g. Design authentication screens" {...register('title')} />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Add more details about this task..."
          className="h-24"
          {...register('description')}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Status</Label>
          <Select
            options={TASK_STATUSES}
            value={status}
            onChange={(v) => setValue('status', v as TaskFormData['status'])}
          />
        </div>

        <div className="space-y-1.5">
          <Label>Priority</Label>
          <Select
            options={TASK_PRIORITIES}
            value={priority}
            onChange={(v) => setValue('priority', v as TaskFormData['priority'])}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Assignee</Label>
          <Select
            options={ASSIGNEE_OPTIONS}
            value={assigneeId ?? ''}
            onChange={(v) => setValue('assigneeId', v)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="dueDate">Due date</Label>
          <Input id="dueDate" type="date" {...register('dueDate')} />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {defaultValues?.id ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  )
}
