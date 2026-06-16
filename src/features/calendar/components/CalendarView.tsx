import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { CalendarEvent, CalendarViewType } from '@/types'

interface CalendarViewProps {
  events: CalendarEvent[]
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1 // Monday-first
}

export function CalendarView({ events }: CalendarViewProps) {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)) // June 2026
  const [view, setView] = useState<CalendarViewType>('month')

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const prev = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }
  const next = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }
  const goToday = () => setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter((e) => e.date === dateStr)
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {MONTHS[month]} {year}
          </h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={prev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToday}>
              Today
            </Button>
            <Button variant="ghost" size="icon" onClick={next}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center rounded-lg border overflow-hidden">
          {(['month', 'week', 'day'] as CalendarViewType[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                'px-3 py-1.5 text-sm capitalize transition-colors',
                view === v
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 border rounded-t-lg overflow-hidden">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-muted-foreground py-2 bg-muted/30 border-b"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 border-x border-b rounded-b-lg flex-1 overflow-hidden">
        {cells.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} className="border-b border-r bg-muted/10 min-h-[100px]" />
          }

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
          const dayEvents = getEventsForDay(day)

          return (
            <div
              key={day}
              className={cn(
                'min-h-[100px] p-1.5 border-b border-r text-sm',
                isToday && 'bg-primary/5'
              )}
            >
              <span
                className={cn(
                  'inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium mb-1',
                  isToday && 'bg-primary text-primary-foreground'
                )}
              >
                {day}
              </span>
              <div className="space-y-0.5">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="truncate rounded px-1.5 py-0.5 text-xs bg-primary/10 text-primary font-medium cursor-pointer hover:bg-primary/20 transition-colors"
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <p className="text-xs text-muted-foreground pl-1">
                    +{dayEvents.length - 3} more
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
