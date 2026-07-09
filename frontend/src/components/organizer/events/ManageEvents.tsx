import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { MANAGED_EVENTS } from './managed-events'
import { ManagedEventCard } from './ManagedEventCard'

export function ManageEvents() {
  const events = MANAGED_EVENTS

  return (
    <div className="px-4 pb-[60px] sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-3 pt-7 sm:pt-11">
        <h2 className="font-display text-[28px] font-semibold leading-[1.06] tracking-[-0.04em]">
          Your Events
        </h2>
        <Link
          to="/organizer/events/new"
          className="flex items-center gap-1.5 rounded-full bg-primary px-[18px] py-2.5 text-[13px] font-bold text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          <Plus className="size-[15px]" strokeWidth={2.4} />
          Create Event
        </Link>
      </div>

      {events.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <ManagedEventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-[18px] border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          You haven’t created any events yet.
        </div>
      )}
    </div>
  )
}
