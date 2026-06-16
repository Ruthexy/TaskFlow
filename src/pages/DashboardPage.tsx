import { useState } from 'react'
import { Plus } from 'lucide-react'
import { FolderKanban, CheckSquare, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { MetricCard } from '@/features/dashboard/components/MetricCard'
import { TeamProductivityChart } from '@/features/dashboard/components/TeamProductivityChart'
import { CompletionRateWidget } from '@/features/dashboard/components/CompletionRateWidget'
import { ActivityFeed } from '@/features/dashboard/components/ActivityFeed'
import { QuickActions } from '@/features/dashboard/components/QuickActions'
import { UpcomingDeadlines } from '@/features/dashboard/components/UpcomingDeadlines'
import { ProjectProgressList } from '@/features/dashboard/components/ProjectProgressList'
import { NewProjectModal } from '@/features/projects/components/NewProjectModal'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { InviteMemberModal } from '@/features/team/components/InviteMemberModal'
import { Button } from '@/components/ui/button'
import { MOCK_DASHBOARD } from '@/lib/mockData'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const [projectModal, setProjectModal] = useState(false)
  const [taskModal, setTaskModal] = useState(false)
  const [inviteModal, setInviteModal] = useState(false)

  const d = MOCK_DASHBOARD

  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {getGreeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Here&apos;s what&apos;s happening across your workspace today.
          </p>
        </div>
        <Button onClick={() => setProjectModal(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New project
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          title="Active Projects"
          value={d.metrics.activeProjects}
          delta={d.metrics.activeProjectsDelta}
          icon={FolderKanban}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Total Tasks"
          value={d.metrics.totalTasks}
          delta={d.metrics.totalTasksDelta}
          icon={CheckSquare}
          iconColor="text-violet-500"
        />
        <MetricCard
          title="Completed"
          value={d.metrics.completed}
          delta={d.metrics.completedDelta}
          icon={CheckCircle2}
          iconColor="text-emerald-500"
        />
        <MetricCard
          title="Overdue"
          value={d.metrics.overdue}
          delta={d.metrics.overdueDelta}
          icon={AlertTriangle}
          iconColor="text-amber-500"
        />
      </div>

      {/* Charts row */}
      <div className="flex gap-4">
        <TeamProductivityChart data={d.productivityData} />
        <CompletionRateWidget rate={d.completionRate} delta={d.completionRateDelta} />
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-3 gap-4">
        <ActivityFeed items={d.recentActivity} />
        <div className="space-y-4">
          <QuickActions
            onCreateProject={() => setProjectModal(true)}
            onCreateTask={() => setTaskModal(true)}
            onInviteMember={() => setInviteModal(true)}
          />
          <UpcomingDeadlines deadlines={d.upcomingDeadlines} />
        </div>
        <ProjectProgressList projects={d.projectProgress} />
      </div>

      {/* Modals */}
      <NewProjectModal open={projectModal} onOpenChange={setProjectModal} />
      <TaskModal open={taskModal} onOpenChange={setTaskModal} />
      <InviteMemberModal open={inviteModal} onOpenChange={setInviteModal} />
    </div>
  )
}
