import { createFileRoute, Link } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { EventDetail } from '#/components/discover/EventDetail'
import { getEventDetail } from '#/components/discover/events'

export const Route = createFileRoute('/events/$id')({
  component: EventDetailPage,
})

function EventDetailPage() {
  const { id } = Route.useParams()
  const event = getEventDetail(id)

  return (
    <AppLayout active="discover" title="Event">
      {event ? (
        <EventDetail event={event} />
      ) : (
        <div className="px-10 pb-[60px] pt-16 text-center">
          <div className="text-sm text-muted-foreground">
            That event doesn’t exist.
          </div>
          <Link
            to="/"
            className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Back to discover
          </Link>
        </div>
      )}
    </AppLayout>
  )
}
