import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  Calendar,
  Check,
  MapPin,
  Minus,
  Plus,
  User,
} from 'lucide-react'
import { cn } from '#/lib/utils'
import { CATEGORY_ICON } from './events'
import type { EventDetail as EventDetailData, EventTier } from './events'

export function EventDetail({ event }: { event: EventDetailData }) {
  const Icon = CATEGORY_ICON[event.category]
  const [qty, setQty] = useState<Partial<Record<string, number>>>({})
  const [waitlist, setWaitlist] = useState<Partial<Record<string, boolean>>>({})

  const total = useMemo(
    () =>
      event.tiers.reduce(
        (sum, tier) => sum + (qty[tier.id] ?? 0) * tier.price,
        0,
      ),
    [event.tiers, qty],
  )

  function setTierQty(tier: EventTier, next: number) {
    const clamped = Math.max(0, Math.min(tier.remaining, next))
    setQty((prev) => ({ ...prev, [tier.id]: clamped }))
  }

  return (
    <div className="px-10 pb-[60px] pt-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-[15px]" strokeWidth={2.2} />
        Back to discover
      </Link>

      <div className="relative mt-4 flex h-[260px] items-center justify-center overflow-hidden rounded-[18px] bg-[repeating-linear-gradient(45deg,var(--stripe-a)_0_10px,var(--stripe-b)_10px_20px)]">
        <span className="text-[11px] tracking-[0.05em] text-stripe-txt">
          event cover
        </span>
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-card px-2.5 py-[5px] text-[11px] font-bold shadow-soft">
          <Icon className="size-[13px]" strokeWidth={2} />
          {event.category}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          <h1 className="font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em]">
            {event.title}
          </h1>

          <div className="mt-6 flex flex-col gap-4">
            <InfoRow icon={Calendar} title={event.when}>
              Doors open one hour before start
            </InfoRow>
            <InfoRow icon={MapPin} title={event.venue}>
              {event.address} · {event.capacity}
            </InfoRow>
            <InfoRow icon={User} title={event.organizer}>
              Organizer
            </InfoRow>
          </div>

          <h2 className="mt-9 text-[17px] font-bold tracking-[-0.01em]">
            About this event
          </h2>
          <p className="mt-2.5 max-w-[560px] text-sm leading-[1.65] text-muted-foreground">
            {event.about}
          </p>
        </div>

        <div className="lg:sticky lg:top-[84px] lg:self-start">
          <div className="rounded-[18px] border border-border bg-card p-[22px] shadow-card">
            <div className="text-[17px] font-bold">Tickets</div>
            <div className="mt-0.5 text-[12.5px] text-muted-foreground">
              Availability updates in real time.
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              {event.tiers.map((tier) => (
                <TierRow
                  key={tier.id}
                  tier={tier}
                  qty={qty[tier.id] ?? 0}
                  waitlisted={waitlist[tier.id] ?? false}
                  onQty={(n) => setTierQty(tier, n)}
                  onWaitlist={() =>
                    setWaitlist((prev) => ({ ...prev, [tier.id]: true }))
                  }
                />
              ))}
            </div>

            <StubDivider />

            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted-foreground">
                Total
              </span>
              <span className="font-display text-[20px] font-extrabold">
                ${total}
              </span>
            </div>

            <button
              type="button"
              disabled={total === 0}
              className={cn(
                'mt-4 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity',
                total === 0 ? 'opacity-45' : 'hover:opacity-90',
              )}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Calendar
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 flex-none items-center justify-center rounded-[10px] bg-acc-soft text-primary">
        <Icon className="size-[17px]" strokeWidth={2} />
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-[12.5px] text-muted-foreground">{children}</div>
      </div>
    </div>
  )
}

function TierRow({
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
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">{tier.name}</span>
            {low && (
              <span className="rounded-full bg-err-bg px-2 py-0.5 text-[11px] font-bold text-destructive">
                Only {tier.remaining} left
              </span>
            )}
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            {tier.description}
          </div>
        </div>
        <span className="flex-none text-[15px] font-bold">${tier.price}</span>
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

// Ticket-stub divider: dashed line with punched half-circles at both edges.
function StubDivider() {
  return (
    <div className="relative my-4 flex items-center">
      <div className="absolute -left-[22px] size-4 rounded-full bg-surface" />
      <div className="flex-1 border-t-2 border-dashed border-border" />
      <div className="absolute -right-[22px] size-4 rounded-full bg-surface" />
    </div>
  )
}
