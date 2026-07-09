import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, Download, Search } from 'lucide-react'
import { cn } from '#/lib/utils'
import { useDebouncedValue } from '#/lib/use-debounce'
import { MANAGED_EVENTS } from '../events/managed-events'
import { ATTENDEES } from './attendees-data'

const PAGE_SIZE = 8
const COLS = 'grid-cols-[1.4fr_1.8fr_1.1fr_0.9fr_0.9fr]'

export function Attendees({ eventId }: { eventId: string }) {
  const event = MANAGED_EVENTS.find((e) => e.id === eventId)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const debouncedQuery = useDebouncedValue(query, 250)

  const q = debouncedQuery.trim().toLowerCase()
  const filtered = ATTENDEES.filter(
    (a) =>
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q),
  )

  // Reset to first page whenever the search changes (adjust during render).
  const [prevQuery, setPrevQuery] = useState(q)
  if (q !== prevQuery) {
    setPrevQuery(q)
    setPage(1)
  }

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="px-4 pb-[60px] sm:px-10">
      <Link
        to="/organizer/events"
        className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-muted-foreground no-underline hover:text-primary"
      >
        <ArrowLeft className="size-[15px]" strokeWidth={2.2} />
        Back To Your Events
      </Link>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-[28px] font-semibold leading-[1.06] tracking-[-0.04em]">
            Attendees
          </h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            {event ? event.title : 'Event'}
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2.5 text-[13px] font-semibold transition-colors hover:border-primary hover:text-primary"
        >
          <Download className="size-[15px]" strokeWidth={2.2} />
          Export CSV
        </button>
      </div>

      <div className="mt-5 flex items-center gap-2.5 rounded-full border border-border bg-card px-5 py-3 shadow-soft sm:max-w-[380px]">
        <Search className="size-4 flex-none text-faint" strokeWidth={2.2} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name or email…"
          className="w-full border-none bg-transparent text-sm outline-none placeholder:text-faint"
        />
      </div>

      {rows.length > 0 ? (
        <div className="mt-4 overflow-x-auto rounded-[18px] border border-border bg-card shadow-card">
          <div className="min-w-[640px]">
            <div
              className={cn(
                'grid gap-2 border-b border-border px-[22px] py-3 text-[11px] font-bold uppercase tracking-[0.06em] text-faint',
                COLS,
              )}
            >
              <span>Name</span>
              <span>Email</span>
              <span>Ticket</span>
              <span>Tier</span>
              <span>Status</span>
            </div>
            {rows.map((a) => (
              <div
                key={a.id}
                className={cn(
                  'grid items-center gap-2 border-b border-border px-[22px] py-3.5 text-[13px] last:border-b-0',
                  COLS,
                )}
              >
                <span className="font-semibold">{a.name}</span>
                <span className="truncate text-muted-foreground">
                  {a.email}
                </span>
                <span className="font-mono text-[12px]">{a.ticket}</span>
                <span className="text-muted-foreground">{a.tier}</span>
                <span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-[11px] font-bold',
                      a.status === 'Confirmed'
                        ? 'bg-ok-bg text-ok'
                        : 'bg-info-bg text-info',
                    )}
                  >
                    {a.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-[18px] border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No attendees match your search.
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-muted-foreground">
        <span>
          {filtered.length} {filtered.length === 1 ? 'attendee' : 'attendees'}
        </span>
        {pageCount > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-full border border-border px-3 py-1.5 font-semibold transition-colors hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground"
            >
              Prev
            </button>
            <span>
              {page} / {pageCount}
            </span>
            <button
              type="button"
              disabled={page === pageCount}
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              className="rounded-full border border-border px-3 py-1.5 font-semibold transition-colors hover:border-primary hover:text-primary disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
