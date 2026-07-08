import { Input } from '#/components/ui/input'
import { TicketStub } from '#/components/common/TicketStub'
import type { Cart } from '#/lib/cart'

export function OrderSummary({
  cart,
  promoApplied,
  promoInput,
  promoError,
  promoLabel,
  discount,
  total,
  onPromoInput,
  onApply,
  onRemove,
}: {
  cart: Cart
  promoApplied: boolean
  promoInput: string
  promoError: string | null
  promoLabel: string
  discount: number
  total: number
  onPromoInput: (value: string) => void
  onApply: () => void
  onRemove: () => void
}) {
  return (
    <div className="rounded-[18px] border border-border bg-card p-[22px] shadow-card">
      <div className="text-[15px] font-bold">{cart.eventTitle}</div>
      <div className="mt-0.5 text-[12.5px] text-muted-foreground">
        {cart.when}
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {cart.lines.map((line) => (
          <div
            key={line.tierId}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-muted-foreground">
              {line.name} × {line.qty}
            </span>
            <span className="font-semibold text-foreground">
              ${line.price * line.qty}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4">
        {promoApplied ? (
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <span className="rounded-full bg-ok-bg px-2.5 py-1 text-[11px] font-bold text-ok">
                {promoLabel}
              </span>
              <button
                type="button"
                onClick={onRemove}
                className="text-[12px] font-semibold text-muted-foreground underline hover:text-foreground"
              >
                Remove
              </button>
            </span>
            <span className="font-semibold text-ok">−${discount}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <Input
                value={promoInput}
                onChange={(e) => onPromoInput(e.target.value)}
                placeholder="Promo code"
                className="h-auto rounded-xl border-[1.5px] px-4 py-2.5 text-sm"
              />
              <button
                type="button"
                onClick={onApply}
                className="flex-none rounded-full border border-border px-4 py-2.5 text-[13px] font-bold transition-colors hover:border-primary hover:text-primary"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-xs font-medium text-destructive">
                {promoError}
              </p>
            )}
          </div>
        )}
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
    </div>
  )
}
