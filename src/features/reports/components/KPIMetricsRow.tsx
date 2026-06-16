import { Zap, Clock, Target, Users } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ReportMetrics } from '@/types'

interface KPICardProps {
  title: string
  value: string
  delta: number
  deltaLabel?: string
  icon: React.ElementType
  iconColor: string
}

function KPICard({ title, value, delta, deltaLabel, icon: Icon, iconColor }: KPICardProps) {
  const isPositive = delta >= 0

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={cn('rounded-lg p-2', iconColor)}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <div className={cn(
          'flex items-center gap-1 mt-1.5 text-xs font-medium',
          isPositive ? 'text-emerald-600' : 'text-red-600'
        )}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span>{isPositive ? '+' : ''}{delta}{deltaLabel ?? '% vs last period'}</span>
        </div>
      </CardContent>
    </Card>
  )
}

interface KPIMetricsRowProps {
  metrics: ReportMetrics
}

export function KPIMetricsRow({ metrics }: KPIMetricsRowProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <KPICard
        title="Velocity"
        value={String(metrics.velocity)}
        delta={metrics.velocityDelta}
        icon={Zap}
        iconColor="bg-blue-100 text-blue-600"
      />
      <KPICard
        title="Avg Cycle Time"
        value={`${metrics.avgCycleTime}d`}
        delta={metrics.cycleTimeDelta}
        deltaLabel="d improvement"
        icon={Clock}
        iconColor="bg-violet-100 text-violet-600"
      />
      <KPICard
        title="On-time Delivery"
        value={`${metrics.onTimeDelivery}%`}
        delta={metrics.onTimeDelta}
        icon={Target}
        iconColor="bg-emerald-100 text-emerald-600"
      />
      <KPICard
        title="Active Contributors"
        value={String(metrics.activeContributors)}
        delta={0}
        deltaLabel={` across ${metrics.rolesCount} roles`}
        icon={Users}
        iconColor="bg-amber-100 text-amber-600"
      />
    </div>
  )
}
