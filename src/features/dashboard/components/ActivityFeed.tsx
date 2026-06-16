import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/shared/Avatar'
import { formatRelativeTime } from '@/lib/utils'
import type { ActivityItem } from '@/types'

interface ActivityFeedProps {
  items: ActivityItem[]
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Link to="/notifications" className="text-xs text-primary hover:underline flex items-center gap-0.5">
            View all <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <Avatar name={item.actorName} avatarUrl={item.actorAvatarUrl} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{item.actorName}</span>{' '}
                <span className="text-muted-foreground">{item.action}</span>{' '}
                <span className="font-medium">{item.resourceName}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatRelativeTime(item.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
