import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { TeamMemberCard } from '@/features/team/components/TeamMemberCard'
import { InviteMemberModal } from '@/features/team/components/InviteMemberModal'
import { Button } from '@/components/ui/button'
import { MOCK_TEAM_MEMBERS, MOCK_WORKSPACE } from '@/lib/mockData'

export function TeamPage() {
  const [inviteOpen, setInviteOpen] = useState(false)

  const roleCount = new Set(MOCK_TEAM_MEMBERS.map((m) => m.role)).size

  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {MOCK_TEAM_MEMBERS.length} people · {roleCount} roles · {MOCK_WORKSPACE.name} workspace
          </p>
        </div>
        <Button onClick={() => setInviteOpen(true)} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Invite member
        </Button>
      </div>

      {/* Member grid */}
      <div className="grid grid-cols-3 gap-4">
        {MOCK_TEAM_MEMBERS.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

      <InviteMemberModal open={inviteOpen} onOpenChange={setInviteOpen} />
    </div>
  )
}
