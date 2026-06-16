import { useOutletContext } from 'react-router-dom'
import { CalendarView } from '@/features/calendar/components/CalendarView'
import { MOCK_CALENDAR_EVENTS } from '@/lib/mockData'
import type { Project } from '@/types'

export function ProjectCalendarPage() {
  const { project } = useOutletContext<{ project: Project }>()
  const events = MOCK_CALENDAR_EVENTS.filter((e) => e.projectId === project.id)

  return (
    <div className="px-6 py-4 flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
      <CalendarView events={events} />
    </div>
  )
}
