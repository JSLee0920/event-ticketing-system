import { useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '#/lib/use-debounce'
import { SAMPLE_EVENTS } from '#/components/discover/events'
import { EventFilters } from './EventFilters'
import type { CategoryFilter } from './EventFilters'
import { EventRow } from './EventRow'
import { Pagination } from './Pagination'

const PAGE_SIZE = 10

export function EventList() {
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [query, setQuery] = useState('')
  const [hideSoldOut, setHideSoldOut] = useState(false)
  const debouncedQuery = useDebouncedValue(query, 250)

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    return SAMPLE_EVENTS.filter((e) => {
      if (category !== 'All' && e.category !== category) return false
      if (hideSoldOut && e.soldOut) return false
      if (!q) return true
      return (
        e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q)
      )
    })
  }, [category, debouncedQuery, hideSoldOut])

  // Reset to first page whenever the filter set changes.
  useEffect(() => {
    setPage(1)
  }, [category, debouncedQuery, hideSoldOut])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const events = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="px-4 pb-[60px] sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-3 pb-2 pt-7 sm:gap-6 sm:pt-11">
        <h2 className="font-display text-[28px] font-semibold leading-[1.06] tracking-[-0.04em]">
          All Events
        </h2>
        <span className="text-[13px] text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'event' : 'events'}
        </span>
      </div>

      <EventFilters
        query={query}
        onQuery={setQuery}
        category={category}
        onCategory={setCategory}
        hideSoldOut={hideSoldOut}
        onToggleSoldOut={() => setHideSoldOut((v) => !v)}
      />

      {events.length > 0 ? (
        <div className="flex flex-col gap-3 pt-6">
          {events.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[14px] border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No events match your filters.
        </div>
      )}

      <Pagination page={page} pageCount={pageCount} onChange={setPage} />
    </div>
  )
}
