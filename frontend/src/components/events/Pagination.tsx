import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '#/lib/utils'

export function Pagination({
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
