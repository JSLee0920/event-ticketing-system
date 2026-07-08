import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'
import { CATEGORY_ICON } from '#/components/discover/events'
import type { DiscoverEvent } from '#/components/discover/events'

export function EventRow({ event }: { event: DiscoverEvent }) {
  const Icon = CATEGORY_ICON[event.category]

  return (
    <Link
      to="/events/$id"
      params={{ id: event.id }}
      className={cn(
        'flex items-stretch gap-3 overflow-hidden rounded-[14px] border border-border bg-card text-left text-foreground no-underline shadow-card sm:gap-4',
        event.soldOut && 'opacity-80',
      )}
    >
      <div className="relative flex h-[92px] w-[96px] flex-none items-center justify-center bg-[repeating-linear-gradient(45deg,var(--stripe-a)_0_10px,var(--stripe-b)_10px_20px)] sm:w-[140px]">
        <span className="text-[10px] tracking-[0.05em] text-stripe-txt">
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

      <div className="flex min-w-0 flex-1 flex-col justify-center py-3">
        <div className="flex items-center gap-2">
          <span className="flex flex-none items-center gap-1 rounded-full border border-border px-1.5 py-0.5 text-[9.5px] font-bold leading-none shadow-soft">
            <Icon className="size-[10px]" strokeWidth={2} />
            {event.category}
          </span>
        </div>
        <div className="mt-1.5 truncate text-[14px] font-bold leading-[1.3] tracking-[-0.02em] text-foreground">
          {event.title}
        </div>
        <div className="mt-0.5 truncate text-[11.5px] text-muted-foreground">
          {event.when} · {event.venue}
        </div>
      </div>

      <div className="flex flex-none flex-col items-end justify-center gap-1.5 py-3 pr-3 sm:pr-5">
        {event.soldOut ? (
          <span className="text-[13px] font-bold text-faint">—</span>
        ) : (
          <div className="flex flex-col items-end gap-[2px]">
            <span className="text-[13px] font-bold text-foreground">
              {event.priceLabel}
            </span>
            {event.scarcity && (
              <span className="text-[10px] font-bold text-destructive">
                {event.scarcity}
              </span>
            )}
          </div>
        )}

        {event.soldOut ? (
          <span className="rounded-full bg-secondary px-3.5 py-2 text-[11px] font-bold text-faint">
            Sold out
          </span>
        ) : (
          <span className="rounded-full bg-primary px-3.5 py-2 text-[11px] font-bold text-primary-foreground">
            Get tickets
          </span>
        )}
      </div>
    </Link>
  )
}
