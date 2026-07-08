import { Check, Minus, Plus } from 'lucide-react'
import { cn } from '#/lib/utils'
import type { EventTier } from './events'

export function TierRow({
  tier,
  qty,
  waitlisted,
  onQty,
  onWaitlist,
}: {
  tier: EventTier
  qty: number
  waitlisted: boolean
  onQty: (n: number) => void
  onWaitlist: () => void
}) {
  const soldOut = tier.remaining === 0
  const low = !soldOut && tier.remaining <= 25

  return (
    <div className="rounded-[14px] border border-border p-3.5">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate text-sm font-bold">{tier.name}</span>
            {low && (
              <span className="flex-none rounded-full bg-err-bg px-2 py-0.5 text-[11px] font-bold text-destructive">
                Only {tier.remaining} left
              </span>
            )}
          </div>
          <span className="flex-none text-[15px] font-bold">${tier.price}</span>
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          {tier.description}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {soldOut ? (
          <>
            <span className="rounded-full bg-secondary px-3 py-1 text-[12px] font-bold text-faint">
              Sold out
            </span>
            {waitlisted ? (
              <span className="flex items-center gap-1 rounded-full bg-ok-bg px-3 py-1.5 text-[12px] font-bold text-ok">
                <Check className="size-[13px]" strokeWidth={2.5} />
                On the waitlist
              </span>
            ) : (
              <button
                type="button"
                onClick={onWaitlist}
                className="rounded-full border border-primary px-3 py-1.5 text-[12px] font-bold text-primary hover:bg-acc-soft"
              >
                Join waitlist
              </button>
            )}
          </>
        ) : (
          <div className="ml-auto flex items-center gap-3">
            <StepButton
              onClick={() => onQty(qty - 1)}
              disabled={qty === 0}
              label="Decrease"
            >
              <Minus className="size-[15px]" strokeWidth={2.5} />
            </StepButton>
            <span className="w-4 text-center text-sm font-bold tabular-nums">
              {qty}
            </span>
            <StepButton
              onClick={() => onQty(qty + 1)}
              disabled={qty >= tier.remaining}
              label="Increase"
            >
              <Plus className="size-[15px]" strokeWidth={2.5} />
            </StepButton>
          </div>
        )}
      </div>
    </div>
  )
}

function StepButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void
  disabled: boolean
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'flex size-8 items-center justify-center rounded-full border border-border transition-colors',
        disabled ? 'opacity-35' : 'hover:border-primary hover:text-primary',
      )}
    >
      {children}
    </button>
  )
}
