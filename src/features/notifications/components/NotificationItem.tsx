import { cn, formatRelativeTime } from '@/lib/utils'
import { Avatar } from '@/components/shared/Avatar'
import type { Notification } from '@/types'


interface NotificationItemProps {
  notification: Notification
  onMarkRead: (id: string) => void
}

export function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50',
        !notification.isRead && 'bg-primary/5 border-primary/20'
      )}
      onClick={() => !notification.isRead && onMarkRead(notification.id)}
    >
      <div className="relative shrink-0">
        <Avatar name={notification.actorName} avatarUrl={notification.actorAvatarUrl} size="md" />
        {!notification.isRead && (
          <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-semibold">{notification.actorName}</span>{' '}
          <span className="text-muted-foreground">{notification.message.replace(notification.actorName, '').trim()}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatRelativeTime(notification.createdAt)}
        </p>
      </div>
    </div>
  )
}
