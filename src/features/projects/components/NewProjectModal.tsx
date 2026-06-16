import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody,
} from '@/components/ui/dialog'
import { ProjectForm } from './ProjectForm'
import type { ProjectFormData } from '../schemas/project.schema'

interface NewProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function NewProjectModal({ open, onOpenChange, onSuccess }: NewProjectModalProps) {
  const handleSubmit = (_data: ProjectFormData) => {
    onOpenChange(false)
    onSuccess?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)}>
        <DialogHeader>
          <DialogTitle>Create new project</DialogTitle>
          <DialogDescription>
            Set up a new project for your team to collaborate on.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <ProjectForm
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
