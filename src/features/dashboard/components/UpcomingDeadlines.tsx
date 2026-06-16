import { Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/shared/Avatar'
import { formatShortDate } from '@/lib/utils'

interface Deadline {
  id: string
  date: string
  taskName: string
  assigneeName: string
  assigneeAvatarUrl: string | null
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[]
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {deadlines.map((deadline) => (
          <div key={deadline.id} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-center shrink-0">
              <div>
                <p className="text-xs font-bold leading-none text-foreground">
                  {new Date(deadline.date).getDate()}
                </p>
                <p className="text-xs text-muted-foreground leading-none mt-0.5">
                  {new Date(deadline.date).toLocaleString('default', { month: 'short' })}
                </p>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{deadline.taskName}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{formatShortDate(deadline.date)}</span>
              </div>
            </div>
            <Avatar name={deadline.assigneeName} avatarUrl={deadline.assigneeAvatarUrl} size="xs" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
