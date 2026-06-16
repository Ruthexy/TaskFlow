import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { projectSchema, type ProjectFormData } from '../schemas/project.schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { PROJECT_STATUSES } from '@/lib/constants'
import type { Project } from '@/types'

interface ProjectFormProps {
  defaultValues?: Partial<Project>
  onSubmit: (data: ProjectFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export function ProjectForm({ defaultValues, onSubmit, onCancel, isLoading }: ProjectFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      description: defaultValues?.description ?? '',
      status: defaultValues?.status ?? 'planning',
      dueDate: defaultValues?.dueDate ?? '',
    },
  })

  const status = watch('status')

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Project name *</Label>
        <Input id="name" placeholder="e.g. Atlas Mobile App" {...register('name')} />
        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="What is this project about?"
          {...register('description')}
        />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Status</Label>
          <Select
            options={PROJECT_STATUSES}
            value={status}
            onChange={(v) => setValue('status', v as ProjectFormData['status'])}
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
          {defaultValues ? 'Save changes' : 'Create project'}
        </Button>
      </div>
    </form>
  )
}
