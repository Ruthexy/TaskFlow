import { TrendingUp, TrendingDown } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  delta: number
  icon: LucideIcon
  iconColor?: string
}

export function MetricCard({ title, value, delta, icon: Icon, iconColor = 'text-primary' }: MetricCardProps) {
  const isPositive = delta >= 0

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2 text-foreground">{value}</p>
            <div className={cn(
              'flex items-center gap-1 mt-2 text-xs font-medium',
              isPositive ? 'text-emerald-600' : 'text-red-600'
            )}>
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{isPositive ? '+' : ''}{delta}% vs last week</span>
            </div>
          </div>
          <div className={cn('rounded-xl p-2.5 bg-primary/10', iconColor.replace('text-', 'bg-').replace('-500', '-500/10'))}>
            <Icon className={cn('h-5 w-5', iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
