import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { Attendees } from '#/components/organizer/attendees/Attendees'

export const Route = createFileRoute('/organizer/events/$id/attendees')({
  component: AttendeesPage,
})

function AttendeesPage() {
  const { id } = Route.useParams()
  return (
    <AppLayout active="events" title="Attendees">
      <Attendees eventId={id} />
    </AppLayout>
  )
}
