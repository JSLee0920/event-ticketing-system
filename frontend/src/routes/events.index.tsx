import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { EventList } from '#/components/events/EventList'

export const Route = createFileRoute('/events/')({ component: EventsPage })

function EventsPage() {
  return (
    <AppLayout active="browse" title="Events">
      <EventList />
    </AppLayout>
  )
}
