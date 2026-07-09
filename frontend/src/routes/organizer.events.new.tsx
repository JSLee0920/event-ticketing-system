import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { EventForm } from '#/components/organizer/events/EventForm'

export const Route = createFileRoute('/organizer/events/new')({
  component: CreateEventPage,
})

function CreateEventPage() {
  return (
    <AppLayout active="events" title="Create Event">
      <EventForm />
    </AppLayout>
  )
}
