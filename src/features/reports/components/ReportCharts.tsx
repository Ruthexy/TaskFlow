import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { ReportOverview } from '@/types'
import { PROJECT_STATUS_CONFIG } from '@/lib/utils'

const PIE_COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981']

interface ReportChartsProps {
  data: ReportOverview
}

const TOOLTIP_STYLE = {
  borderRadius: '8px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  fontSize: '12px',
}

export function ProductivityTrendChart({ data }: { data: ReportOverview['productivityTrend'] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity Trend</CardTitle>
        <CardDescription>Completion rate over 8 weeks</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} domain={[0, 100]} unit="%" />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [`${v}%`, 'Rate']} />
            <Line type="monotone" dataKey="completionRate" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ProjectMixChart({ data }: { data: ReportOverview['projectMix'] }) {
  const labeled = data.map((d) => ({
    ...d,
    name: PROJECT_STATUS_CONFIG[d.status]?.label ?? d.status,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Mix</CardTitle>
        <CardDescription>Current status distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={labeled}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
            >
              {labeled.map((_, idx) => (
                <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend iconType="circle" iconSize={8} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function TeamPerformanceChart({ data }: { data: ReportOverview['teamPerformance'] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
        <CardDescription>Created vs completed per day</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend iconType="circle" iconSize={8} />
            <Bar dataKey="created" fill="#3b82f6" radius={[3, 3, 0, 0]} />
            <Bar dataKey="completed" fill="#10b981" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function WorkloadDistributionChart({ data }: { data: ReportOverview['workloadDistribution'] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workload Distribution</CardTitle>
        <CardDescription>Current load per team member</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} unit="%" />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={40} />
            <Tooltip contentStyle={TOOLTIP_STYLE} formatter={(v) => [`${v}%`, 'Workload']} />
            <Bar
              dataKey="workload"
              radius={[0, 3, 3, 0]}
              label={false}
            >
              {data.map((d, idx) => (
                <Cell
                  key={idx}
                  fill={d.workload >= 85 ? '#ef4444' : d.workload >= 70 ? '#f59e0b' : '#10b981'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ReportCharts({ data }: ReportChartsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ProductivityTrendChart data={data.productivityTrend} />
      <ProjectMixChart data={data.projectMix} />
      <TeamPerformanceChart data={data.teamPerformance} />
      <WorkloadDistributionChart data={data.workloadDistribution} />
    </div>
  )
}
