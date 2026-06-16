import { useState } from 'react'
import { KPIMetricsRow } from '@/features/reports/components/KPIMetricsRow'
import { ReportCharts } from '@/features/reports/components/ReportCharts'
import { MOCK_REPORTS } from '@/lib/mockData'
import { cn } from '@/lib/utils'
import type { ReportPeriod } from '@/types'

const PERIODS: { value: ReportPeriod; label: string }[] = [
  { value: '7d', label: '7d' },
  { value: '30d', label: '30d' },
  { value: 'ytd', label: 'YTD' },
]

export function ReportsPage() {
  const [period, setPeriod] = useState<ReportPeriod>('30d')

  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track velocity, delivery, and team performance over time.
          </p>
        </div>
        {/* Date range filter */}
        <div className="flex items-center rounded-lg border overflow-hidden">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={cn(
                'px-4 py-1.5 text-sm font-medium transition-colors',
                period === p.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI row */}
      <KPIMetricsRow metrics={MOCK_REPORTS.metrics} />

      {/* Charts */}
      <ReportCharts data={MOCK_REPORTS} />
    </div>
  )
}
