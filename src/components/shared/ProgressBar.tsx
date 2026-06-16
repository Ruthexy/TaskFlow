import { cn, getProgressColor } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  showLabel?: boolean
  colorByThreshold?: boolean
  className?: string
  barClassName?: string
}

export function ProgressBar({
  value,
  showLabel = false,
  colorByThreshold = true,
  className,
  barClassName,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))
  const color = colorByThreshold ? getProgressColor(clampedValue) : 'bg-primary'

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-300', color, barClassName)}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground w-8 text-right shrink-0">
          {clampedValue}%
        </span>
      )}
    </div>
  )
}
