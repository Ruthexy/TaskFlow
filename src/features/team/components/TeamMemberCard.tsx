import { MessageSquare, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/shared/Avatar'
import { RoleBadge } from '@/components/shared/StatusBadge'
import { formatRelativeTime, cn } from '@/lib/utils'
import type { TeamMember } from '@/types'

interface TeamMemberCardProps {
  member: TeamMember
}

function WorkloadBar({ value }: { value: number }) {
  const color =
    value >= 85 ? 'bg-red-500' : value >= 70 ? 'bg-amber-500' : 'bg-emerald-500'

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Workload</span>
        <span className={cn('font-medium', value >= 85 ? 'text-red-600' : value >= 70 ? 'text-amber-600' : 'text-emerald-600')}>
          {value}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all', color)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <Avatar name={member.name} avatarUrl={member.avatarUrl} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm truncate">{member.name}</h3>
              <RoleBadge role={member.role} />
            </div>
            <p className="text-xs text-muted-foreground truncate mt-0.5">{member.email}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Active {formatRelativeTime(member.lastActiveAt)}
            </p>
          </div>
        </div>

        <WorkloadBar value={member.workload} />

        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" />
            Message
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 gap-1.5">
            <ExternalLink className="h-3.5 w-3.5" />
            View profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
