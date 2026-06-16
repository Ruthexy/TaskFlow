import { cn, getInitials, getAvatarColor } from '@/lib/utils'

interface AvatarProps {
  name: string
  avatarUrl?: string | null
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const SIZE_CLASSES = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-7 w-7 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-sm',
  xl: 'h-12 w-12 text-base',
}

export function Avatar({ name, avatarUrl, size = 'md', className }: AvatarProps) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={cn(
          'rounded-full object-cover',
          SIZE_CLASSES[size],
          className
        )}
      />
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium text-white shrink-0',
        SIZE_CLASSES[size],
        getAvatarColor(name),
        className
      )}
    >
      {getInitials(name)}
    </span>
  )
}

interface AvatarStackProps {
  members: Array<{ name: string; avatarUrl?: string | null }>
  max?: number
  size?: AvatarProps['size']
}

export function AvatarStack({ members, max = 3, size = 'sm' }: AvatarStackProps) {
  const visible = members.slice(0, max)
  const overflow = members.length - max

  return (
    <div className="flex -space-x-2">
      {visible.map((m) => (
        <Avatar
          key={m.name}
          name={m.name}
          avatarUrl={m.avatarUrl}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-slate-200 text-slate-600 font-medium ring-2 ring-white text-xs',
            SIZE_CLASSES[size]
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  )
}
