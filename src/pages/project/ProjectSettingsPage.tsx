import { useOutletContext } from 'react-router-dom'
import { ProjectForm } from '@/features/projects/components/ProjectForm'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Project } from '@/types'
import type { ProjectFormData } from '@/features/projects/schemas/project.schema'

export function ProjectSettingsPage() {
  const { project } = useOutletContext<{ project: Project }>()

  const handleSubmit = (_data: ProjectFormData) => {
    // would call updateProject mutation
  }

  return (
    <div className="px-6 py-4 max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Settings</CardTitle>
          <CardDescription>Update details for {project.name}.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm
            defaultValues={project}
            onSubmit={handleSubmit}
            onCancel={() => {}}
          />
        </CardContent>
      </Card>

      <Card className="border-destructive/40">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" size="sm">Archive project</Button>
        </CardContent>
      </Card>
    </div>
  )
}
