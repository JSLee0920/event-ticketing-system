import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { ManageEvents } from '#/components/organizer/events/ManageEvents'

export const Route = createFileRoute('/organizer/events/')({
  component: ManageEventsPage,
})

function ManageEventsPage() {
  return (
    <AppLayout active="events" title="Your Events">
      <ManageEvents />
    </AppLayout>
  )
}
