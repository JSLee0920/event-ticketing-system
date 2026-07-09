import { Search } from 'lucide-react'
import { cn } from '#/lib/utils'
import { CATEGORY_ICON } from '#/components/discover/events'
import type { EventCategory } from '#/components/discover/events'

const CATEGORIES: EventCategory[] = ['Music', 'Sports', 'Comedy', 'Arts', 'Food']

export type CategoryFilter = 'All' | EventCategory

export function EventFilters({
  query,
  onQuery,
  category,
  onCategory,
  hideSoldOut,
  onToggleSoldOut,
}: {
  query: string
  onQuery: (value: string) => void
  category: CategoryFilter
  onCategory: (category: CategoryFilter) => void
  hideSoldOut: boolean
  onToggleSoldOut: () => void
}) {
  return (
    <div className="flex flex-col gap-3 pt-5">
      <div className="flex min-w-0 items-center gap-2.5 rounded-full border border-border bg-card px-5 py-3 shadow-soft sm:max-w-[420px]">
        <Search className="size-4 flex-none text-faint" strokeWidth={2.2} />
        <input
          type="text"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search events, venues…"
          aria-label="Search events and venues"
          className="w-full border-none bg-transparent text-sm outline-none placeholder:text-faint"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Chip active={category === 'All'} onClick={() => onCategory('All')}>
          All
        </Chip>
        {CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICON[cat]
          return (
            <Chip
              key={cat}
              active={category === cat}
              onClick={() => onCategory(cat)}
            >
              <Icon className="size-[13px]" strokeWidth={2} />
              {cat}
            </Chip>
          )
        })}
        <span className="mx-1 h-5 w-px flex-none bg-border" />
        <Chip active={hideSoldOut} onClick={onToggleSoldOut}>
          Available Only
        </Chip>
      </div>
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
        'flex items-center gap-1.5 rounded-full border px-[15px] py-[7px] text-[12.5px] font-semibold transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card hover:border-primary hover:text-primary',
      )}
    >
      {children}
    </button>
  )
}
