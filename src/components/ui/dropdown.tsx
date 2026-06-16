import * as React from 'react'
import { cn } from '@/lib/utils'

interface DropdownMenuProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: 'left' | 'right'
  className?: string
}

export function DropdownMenu({ trigger, children, align = 'right', className }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            'absolute z-50 mt-1 min-w-[160px] rounded-md border bg-popover text-popover-foreground shadow-md',
            'animate-in fade-in-0 zoom-in-95',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          onClick={() => setOpen(false)}
        >
          <div className="p-1">{children}</div>
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  destructive?: boolean
}

export function DropdownItem({ className, icon, destructive, children, ...props }: DropdownItemProps) {
  return (
    <button
      className={cn(
        'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
        'focus:outline-none focus:bg-accent',
        'hover:bg-accent cursor-pointer transition-colors',
        destructive && 'text-destructive hover:text-destructive',
        className
      )}
      {...props}
    >
      {icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
      {children}
    </button>
  )
}

export function DropdownSeparator({ className }: { className?: string }) {
  return <div className={cn('h-px bg-border my-1 -mx-1', className)} />
}

export function DropdownLabel({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('px-2 py-1.5 text-xs font-semibold text-muted-foreground', className)}>
      {children}
    </div>
  )
}
