import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'
import { CATEGORY_ICON } from './events'
import type { DiscoverEvent } from './events'

export function EventCard({ event }: { event: DiscoverEvent }) {
  const Icon = CATEGORY_ICON[event.category]

  return (
    <Link
      to="/events/$id"
      params={{ id: event.id }}
      className={cn(
        'block overflow-hidden rounded-[18px] border border-border bg-card text-left text-foreground no-underline shadow-card',
        event.soldOut && 'opacity-80',
      )}
    >
      <div className="relative flex h-[150px] items-center justify-center bg-[repeating-linear-gradient(45deg,var(--stripe-a)_0_10px,var(--stripe-b)_10px_20px)]">
        <span className="text-[11px] tracking-[0.05em] text-stripe-txt">
          event cover
        </span>
        {event.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_srgb,var(--odeon-surface)_55%,transparent)]">
            <span className="rounded-full bg-foreground px-4 py-2 text-[12px] font-bold text-background">
              Sold out
            </span>
          </div>
        )}
      </div>

      <div className="px-[18px] pb-1.5 pt-[15px]">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1 text-[16px] font-bold leading-[1.35] tracking-[-0.02em] text-foreground">
            {event.title}
          </div>
          <span className="flex flex-none items-center gap-1 rounded-full border border-border px-2 py-1 text-[10.5px] font-bold leading-none shadow-soft">
            <Icon className="size-[12px]" strokeWidth={2} />
            {event.category}
          </span>
        </div>
        <div className="mt-[5px] text-[12.5px] text-muted-foreground">
          {event.when} · {event.venue}
        </div>
      </div>

      <div className="relative mt-2 flex items-center">
        <div className="absolute -left-2 size-4 rounded-full bg-surface" />
        <div className="mx-4 flex-1 border-t-2 border-dashed border-border" />
        <div className="absolute -right-2 size-4 rounded-full bg-surface" />
      </div>

      <div className="flex items-center justify-between px-[18px] pb-4 pt-3">
        {event.soldOut ? (
          <span className="text-[14px] font-bold text-faint">—</span>
        ) : (
          <div className="flex flex-col gap-[3px]">
            <span className="text-[14px] font-bold text-foreground">
              {event.priceLabel}
            </span>
            {event.scarcity && (
              <span className="text-[11px] font-bold text-destructive">
                {event.scarcity}
              </span>
            )}
          </div>
        )}

        {event.soldOut ? (
          <span className="rounded-full bg-secondary px-[18px] py-2.5 text-[12.5px] font-bold text-faint">
            Sold out
          </span>
        ) : (
          <span className="rounded-full bg-primary px-[18px] py-2.5 text-[12.5px] font-bold text-primary-foreground">
            Get tickets
          </span>
        )}
      </div>
    </Link>
  )
}
