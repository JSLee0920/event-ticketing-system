import { Link } from '@tanstack/react-router'
import { ArrowLeft, Calendar, MapPin, User } from 'lucide-react'
import { CATEGORY_ICON } from './events'
import { EventTickets } from './EventTickets'
import type { EventDetail as EventDetailData } from './events'

export function EventDetail({ event }: { event: EventDetailData }) {
  const Icon = CATEGORY_ICON[event.category]

  return (
    <div className="px-4 pb-[60px] pt-6 sm:px-10 sm:pt-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-[15px]" strokeWidth={2.2} />
        Back To Discover
      </Link>

      <div className="relative mt-4 flex h-[180px] items-center justify-center overflow-hidden rounded-[18px] bg-[repeating-linear-gradient(45deg,var(--stripe-a)_0_10px,var(--stripe-b)_10px_20px)] sm:h-[260px]">
        <span className="text-[11px] tracking-[0.05em] text-stripe-txt">
          event cover
        </span>
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-card px-2.5 py-[5px] text-[11px] font-bold shadow-soft">
          <Icon className="size-[13px]" strokeWidth={2} />
          {event.category}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          <h1 className="font-display text-[26px] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-[34px]">
            {event.title}
          </h1>

          <div className="mt-6 flex flex-col gap-4">
            <InfoRow icon={Calendar} title={event.when}>
              Doors open one hour before start
            </InfoRow>
            <InfoRow icon={MapPin} title={event.venue}>
              {event.address} · {event.capacity}
            </InfoRow>
            <InfoRow icon={User} title={event.organizer}>
              Organizer
            </InfoRow>
          </div>

          <h2 className="mt-9 text-[17px] font-bold tracking-[-0.01em]">
            About This Event
          </h2>
          <p className="mt-2.5 max-w-[560px] text-sm leading-[1.65] text-muted-foreground">
            {event.about}
          </p>
        </div>

        <div className="lg:sticky lg:top-[84px] lg:self-start">
          <EventTickets event={event} />
        </div>
      </div>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Calendar
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 flex-none items-center justify-center rounded-[10px] bg-acc-soft text-primary">
        <Icon className="size-[17px]" strokeWidth={2} />
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-[12.5px] text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}
