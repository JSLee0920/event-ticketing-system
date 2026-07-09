import { Link } from '@tanstack/react-router'
import { StatusChip } from './StatusChip'
import type { ManagedEvent } from './managed-events'

const PILL_CLASS =
  'rounded-full border border-border px-4 py-2 text-[12px] font-semibold no-underline text-foreground transition-colors hover:border-primary hover:text-primary'

export function ManagedEventCard({ event }: { event: ManagedEvent }) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-border bg-card shadow-card">
      <div className="flex h-[150px] items-center justify-center bg-[repeating-linear-gradient(45deg,var(--stripe-a)_0_10px,var(--stripe-b)_10px_20px)]">
        <span className="text-[11px] tracking-[0.05em] text-stripe-txt">
          event cover
        </span>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[15px] font-bold leading-[1.3]">
            {event.title}
          </span>
          <StatusChip status={event.status} />
        </div>
        <div className="mt-0.5 text-[12.5px] text-muted-foreground">
          {event.when} · {event.venue}
        </div>

        {event.cancelledNote ? (
          <div className="mt-4 rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-3 text-[12px] leading-normal text-muted-foreground">
            {event.cancelledNote}
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {event.tiers.map((tier) => (
              <TierBar key={tier.name} tier={tier} />
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[12.5px] font-semibold text-muted-foreground">
            Revenue ${event.revenue.toLocaleString()} · {event.scanned} scanned
          </span>
          <div className="flex gap-2">
            <Link
              to="/organizer/events/$id/attendees"
              params={{ id: event.id }}
              className={PILL_CLASS}
            >
              Attendees
            </Link>
            <Link
              to="/organizer/events/$id/edit"
              params={{ id: event.id }}
              className={PILL_CLASS}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function TierBar({ tier }: { tier: ManagedEvent['tiers'][number] }) {
  const pct = tier.total > 0 ? Math.round((tier.sold / tier.total) * 100) : 0
  return (
    <div>
      <div className="flex items-center justify-between text-[12px]">
        <span className="font-semibold">{tier.name}</span>
        <span className="text-muted-foreground">
          {tier.sold}/{tier.total}
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
