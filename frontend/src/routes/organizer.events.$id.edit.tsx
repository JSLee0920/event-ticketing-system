import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { EventForm } from '#/components/organizer/events/EventForm'

export const Route = createFileRoute('/organizer/events/$id/edit')({
  component: EditEventPage,
})

function EditEventPage() {
  const { id } = Route.useParams()
  return (
    <AppLayout active="events" title="Edit Event">
      <EventForm eventId={id} />
    </AppLayout>
  )
}
