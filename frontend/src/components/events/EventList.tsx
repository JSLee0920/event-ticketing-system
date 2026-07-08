import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { cn } from '#/lib/utils'
import { CATEGORY_ICON, SAMPLE_EVENTS } from '#/components/discover/events'
import type { DiscoverEvent } from '#/components/discover/events'

const PAGE_SIZE = 10

export function EventList() {
  const [page, setPage] = useState(1)

  const pageCount = Math.max(1, Math.ceil(SAMPLE_EVENTS.length / PAGE_SIZE))
  const events = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return SAMPLE_EVENTS.slice(start, start + PAGE_SIZE)
  }, [page])

  return (
    <div className="px-10 pb-[60px]">
      <div className="flex flex-wrap items-end justify-between gap-6 pb-2 pt-11">
        <h2 className="font-display text-[28px] font-semibold leading-[1.06] tracking-[-0.04em]">
          All Events
        </h2>
        <span className="text-[13px] text-muted-foreground">
          {SAMPLE_EVENTS.length} events
        </span>
      </div>

      <div className="flex flex-col gap-3 pt-6">
        {events.map((event) => (
          <EventRow key={event.id} event={event} />
        ))}
      </div>

      <Pagination page={page} pageCount={pageCount} onChange={setPage} />
    </div>
  )
}

function EventRow({ event }: { event: DiscoverEvent }) {
  const Icon = CATEGORY_ICON[event.category]

  return (
    <Link
      to="/events/$id"
      params={{ id: event.id }}
      className={cn(
        'flex items-stretch gap-4 overflow-hidden rounded-[14px] border border-border bg-card text-left text-foreground no-underline shadow-card',
        event.soldOut && 'opacity-80',
      )}
    >
      <div className="relative flex h-[92px] w-[140px] flex-none items-center justify-center bg-[repeating-linear-gradient(45deg,var(--stripe-a)_0_10px,var(--stripe-b)_10px_20px)]">
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

      <div className="flex flex-none flex-col items-end justify-center gap-1.5 py-3 pr-5">
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

function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number
  pageCount: number
  onChange: (page: number) => void
}) {
  if (pageCount <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 pt-8">
      <PageButton
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" strokeWidth={2.2} />
      </PageButton>

      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <PageButton key={n} active={n === page} onClick={() => onChange(n)}>
          {n}
        </PageButton>
      ))}

      <PageButton
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="size-4" strokeWidth={2.2} />
      </PageButton>
    </div>
  )
}

function PageButton({
  active,
  disabled,
  onClick,
  children,
  ...rest
}: {
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex size-9 items-center justify-center rounded-full border text-[13px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-muted-foreground hover:border-primary hover:text-primary',
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
