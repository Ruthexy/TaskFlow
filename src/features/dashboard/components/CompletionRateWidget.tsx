import { TrendingUp } from 'lucide-react'
import {
  LineChart, Line, ResponsiveContainer, Tooltip,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CompletionRateWidgetProps {
  rate: number
  delta: number
}

const SPARK_DATA = [62, 68, 71, 65, 78, 82, 85, 89].map((v, i) => ({
  w: `W${i + 1}`,
  v,
}))

export function CompletionRateWidget({ rate, delta }: CompletionRateWidgetProps) {
  return (
    <Card className="w-52 shrink-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Completion Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{rate}%</p>
        <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium mt-1">
          <TrendingUp className="h-3 w-3" />
          <span>+{delta}% since W1</span>
        </div>
        <div className="mt-3">
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={SPARK_DATA}>
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 6, padding: '2px 8px' }}
                formatter={(v) => [`${v}%`, 'Rate']}
                labelFormatter={(l) => l}
              />
              <Line
                type="monotone"
                dataKey="v"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-muted-foreground mt-1">8-week trend</p>
      </CardContent>
    </Card>
  )
}
