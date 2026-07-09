import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { cn } from '#/lib/utils'
import { useDebouncedValue } from '#/lib/use-debounce'
import { EventCard } from './EventCard'
import { CATEGORY_ICON, SAMPLE_EVENTS } from './events'
import type { EventCategory } from './events'

const CATEGORIES: EventCategory[] = [
  'Music',
  'Sports',
  'Comedy',
  'Arts',
  'Food',
]
const FILTER_DROPDOWNS = ['Date', 'Venue', 'Price']

type CategoryFilter = 'All' | EventCategory

export function Discover() {
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [query, setQuery] = useState('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const debouncedQuery = useDebouncedValue(query, 250)

  function toggleFilter(label: string) {
    setActiveFilters((prev) =>
      prev.includes(label) ? prev.filter((f) => f !== label) : [...prev, label],
    )
  }

  const q = debouncedQuery.trim().toLowerCase()
  const events = SAMPLE_EVENTS.filter((e) => {
    if (category !== 'All' && e.category !== category) return false
    if (!q) return true
    return (
      e.title.toLowerCase().includes(q) || e.venue.toLowerCase().includes(q)
    )
  })

  return (
    <div className="px-4 pb-[60px] sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4 pt-7 sm:gap-6 sm:pt-11">
        <h2 className="font-display text-[32px] font-semibold leading-[1.06] tracking-[-0.04em] sm:text-[42px]">
          What's On
          <br />
          This Weekend?
        </h2>
        <div className="flex min-w-0 max-w-[520px] flex-1 basis-[340px] items-center gap-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full border border-border bg-card px-5 py-3.5 shadow-soft">
            <Search className="size-4 flex-none text-faint" strokeWidth={2.2} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, venues…"
              aria-label="Search events and venues"
              className="w-full border-none bg-transparent text-sm outline-none placeholder:text-faint"
            />
          </div>
          <button
            type="button"
            className="rounded-full bg-primary px-[26px] py-3.5 text-[13.5px] font-bold text-primary-foreground hover:opacity-90"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-[26px]">
        <div className="flex flex-wrap gap-2">
          <Chip active={category === 'All'} onClick={() => setCategory('All')}>
            All
          </Chip>
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICON[cat]
            return (
              <Chip
                key={cat}
                active={category === cat}
                onClick={() => setCategory(cat)}
              >
                <Icon className="size-[13px]" strokeWidth={2} />
                {cat}
              </Chip>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-2 text-[12.5px] font-semibold">
          {FILTER_DROPDOWNS.map((label) => {
            const active = activeFilters.includes(label)
            return (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                onClick={() => toggleFilter(label)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-3.5 py-2 transition-colors',
                  active
                    ? 'border-primary bg-acc-soft text-primary'
                    : 'border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary',
                )}
              >
                {label}
                <ChevronDown
                  className={cn(
                    'size-[13px] transition-transform',
                    active && 'rotate-180',
                  )}
                  strokeWidth={2.2}
                />
              </button>
            )
          })}
        </div>
      </div>

      <div className="pb-3 pt-[30px] text-sm font-bold text-muted-foreground">
        This weekend
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-[18px] border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          No events match your search.
        </div>
      )}
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-full border px-[18px] py-[9px] text-[13px] font-semibold transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card hover:border-primary hover:text-primary',
      )}
    >
      {children}
    </button>
  )
}
