import { FolderPlus, CheckSquare, UserPlus, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface QuickActionsProps {
  onCreateProject: () => void
  onCreateTask: () => void
  onInviteMember: () => void
}

export function QuickActions({ onCreateProject, onCreateTask, onInviteMember }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 h-auto py-3"
          onClick={onCreateProject}
        >
          <FolderPlus className="h-4 w-4 text-blue-500 shrink-0" />
          <span className="text-left leading-tight">
            <span className="block text-xs font-medium">Create project</span>
          </span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 h-auto py-3"
          onClick={onCreateTask}
        >
          <CheckSquare className="h-4 w-4 text-emerald-500 shrink-0" />
          <span className="text-left leading-tight">
            <span className="block text-xs font-medium">Create task</span>
          </span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 h-auto py-3"
          onClick={onInviteMember}
        >
          <UserPlus className="h-4 w-4 text-violet-500 shrink-0" />
          <span className="text-left leading-tight">
            <span className="block text-xs font-medium">Invite member</span>
          </span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="justify-start gap-2 h-auto py-3"
          onClick={() => {}}
        >
          <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
          <span className="text-left leading-tight">
            <span className="block text-xs font-medium">Ask AI assistant</span>
          </span>
        </Button>
      </CardContent>
    </Card>
  )
}
