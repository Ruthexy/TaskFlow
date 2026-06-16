import { CalendarView } from '@/features/calendar/components/CalendarView'
import { MOCK_CALENDAR_EVENTS } from '@/lib/mockData'

export function CalendarPage() {
  return (
    <div className="px-6 py-6 max-w-[1400px] mx-auto flex flex-col" style={{ height: 'calc(100vh - 56px)' }}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Track deadlines and task schedules across your projects.
        </p>
      </div>
      <div className="flex-1 overflow-hidden">
        <CalendarView events={MOCK_CALENDAR_EVENTS} />
      </div>
    </div>
  )
}
