import { useState } from 'react'
import { CheckCheck } from 'lucide-react'
import { NotificationItem } from '@/features/notifications/components/NotificationItem'
import { Button } from '@/components/ui/button'
import { useNotificationStore } from '@/stores/notificationStore'
import { cn } from '@/lib/utils'
import { MOCK_NOTIFICATIONS } from '@/lib/mockData'
import type { NotifFilter, Notification } from '@/types'

const FILTERS: { value: NotifFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'unread', label: 'Unread' },
  { value: 'mentions', label: 'Mentions' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'comments', label: 'Comments' },
]

export function NotificationsPage() {
  const [filter, setFilter] = useState<NotifFilter>('all')
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const clearUnread = useNotificationStore((s) => s.clearUnread)
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount)

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true
    if (filter === 'unread') return !n.isRead
    if (filter === 'mentions') return n.type === 'mention'
    if (filter === 'assigned') return n.type === 'assignment'
    if (filter === 'comments') return n.type === 'comment'
    return true
  })

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
    const remaining = notifications.filter((n) => !n.isRead && n.id !== id).length
    setUnreadCount(remaining)
  }

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    clearUnread()
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="px-6 py-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Stay on top of mentions, assignments, and project activity.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllRead} className="gap-2">
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </Button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b mb-4">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
              filter === f.value
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            {f.label}
            {f.value === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 rounded-full bg-primary text-primary-foreground text-xs px-1.5 py-0.5">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CheckCheck className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium">You&apos;re all caught up!</p>
            <p className="text-xs text-muted-foreground mt-1">No notifications in this category.</p>
          </div>
        ) : (
          filtered.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={handleMarkRead}
            />
          ))
        )}
      </div>
    </div>
  )
}
