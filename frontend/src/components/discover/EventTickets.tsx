import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { cn } from '#/lib/utils'
import { setCart } from '#/lib/cart'
import { TicketStub } from '#/components/common/TicketStub'
import { TierRow } from './TierRow'
import type { EventDetail, EventTier } from './events'

export function EventTickets({ event }: { event: EventDetail }) {
  const navigate = useNavigate()
  const [qty, setQty] = useState<Partial<Record<string, number>>>({})
  const [waitlist, setWaitlist] = useState<Partial<Record<string, boolean>>>({})

  const total = event.tiers.reduce(
    (sum, tier) => sum + (qty[tier.id] ?? 0) * tier.price,
    0,
  )

  function setTierQty(tier: EventTier, next: number) {
    const clamped = Math.max(0, Math.min(tier.remaining, next))
    setQty((prev) => ({ ...prev, [tier.id]: clamped }))
  }

  function checkout() {
    const lines = event.tiers
      .map((tier) => ({
        tierId: tier.id,
        name: tier.name,
        price: tier.price,
        qty: qty[tier.id] ?? 0,
      }))
      .filter((line) => line.qty > 0)
    if (lines.length === 0) return
    setCart({
      eventId: event.id,
      eventTitle: event.title,
      when: event.when,
      lines,
    })
    navigate({ to: '/checkout' })
  }

  return (
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

      <TicketStub />

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
        onClick={checkout}
        disabled={total === 0}
        className={cn(
          'mt-4 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity',
          total === 0 ? 'opacity-45' : 'hover:opacity-90',
        )}
      >
        Checkout
      </button>
    </div>
  )
}
