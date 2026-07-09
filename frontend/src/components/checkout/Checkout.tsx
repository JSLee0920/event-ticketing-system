import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { clearCart, getCart } from '#/lib/cart'
import { PaymentCard } from './PaymentCard'
import { OrderSummary } from './OrderSummary'
import { PaymentResult } from './PaymentResult'
import { EmptyCart } from './EmptyCart'

const PROMO_CODE = 'EARLYBIRD'
const PROMO_RATE = 0.1

type PayResult = 'success' | 'fail'

export function Checkout() {
  const navigate = useNavigate()
  // Read the cart once — it's a module singleton set by Event detail.
  const [cart] = useState(getCart)
  const [orderId] = useState(
    () => `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
  )
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState<string | null>(null)
  const [result, setResult] = useState<PayResult | null>(null)

  const subtotal =
    cart?.lines.reduce((sum, line) => sum + line.price * line.qty, 0) ?? 0
  const discount = promoApplied ? Math.round(subtotal * PROMO_RATE) : 0
  const total = subtotal - discount

  function applyPromo() {
    if (promoInput.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true)
      setPromoError(null)
    } else {
      setPromoError('That code isn’t valid.')
    }
  }

  function pay(outcome: PayResult) {
    if (outcome === 'success') clearCart()
    setResult(outcome)
  }

  if (!cart || cart.lines.length === 0) {
    return <EmptyCart />
  }

  if (result) {
    return (
      <PaymentResult
        result={result}
        orderId={orderId}
        onRetry={() => setResult(null)}
        onDiscover={() => navigate({ to: '/' })}
      />
    )
  }

  return (
    <div className="px-4 pb-[60px] pt-6 sm:px-10 sm:pt-8">
      <Link
        to="/events/$id"
        params={{ id: cart.eventId }}
        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-muted-foreground no-underline hover:text-primary"
      >
        <ArrowLeft className="size-[15px]" strokeWidth={2.2} />
        Back To Event
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-7 lg:grid-cols-[1fr_360px]">
        <PaymentCard total={total} onPay={pay} />
        <OrderSummary
          cart={cart}
          promoApplied={promoApplied}
          promoInput={promoInput}
          promoError={promoError}
          promoLabel={`${PROMO_CODE} · −${Math.round(PROMO_RATE * 100)}%`}
          discount={discount}
          total={total}
          onPromoInput={(value) => {
            setPromoInput(value)
            setPromoError(null)
          }}
          onApply={applyPromo}
          onRemove={() => setPromoApplied(false)}
        />
      </div>
    </div>
  )
}
