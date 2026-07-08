import { CheckCircle2, XCircle } from 'lucide-react'
import { cn } from '#/lib/utils'

type PayResult = 'success' | 'fail'

export function PaymentResult({
  result,
  orderId,
  onRetry,
  onDiscover,
}: {
  result: PayResult
  orderId: string
  onRetry: () => void
  onDiscover: () => void
}) {
  const ok = result === 'success'
  return (
    <div className="px-10 pb-[60px] pt-16">
      <div className="mx-auto max-w-[520px] rounded-[18px] border border-border bg-card p-10 text-center shadow-card">
        <div
          className={cn(
            'mx-auto flex size-14 items-center justify-center rounded-full',
            ok ? 'bg-ok-bg text-ok' : 'bg-err-bg text-destructive',
          )}
        >
          {ok ? (
            <CheckCircle2 className="size-7" strokeWidth={2.2} />
          ) : (
            <XCircle className="size-7" strokeWidth={2.2} />
          )}
        </div>

        <h1 className="mt-4 font-display text-[24px] font-extrabold">
          {ok ? 'Order confirmed' : 'Payment failed'}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {ok
            ? `Order ${orderId} · a confirmation is on its way.`
            : 'Your card was declined. No charge was made.'}
        </p>

        <span
          className={cn(
            'mt-4 inline-block rounded-full px-3 py-1 text-[11px] font-bold',
            ok ? 'bg-ok-bg text-ok' : 'bg-err-bg text-destructive',
          )}
        >
          {ok ? 'Payment · Success' : 'Payment · Failed'}
        </span>

        <div className="mt-6 flex items-center justify-center gap-3">
          {ok ? (
            <>
              <PillButton primary onClick={onDiscover}>
                View my tickets
              </PillButton>
              <PillButton onClick={onDiscover}>Back to discover</PillButton>
            </>
          ) : (
            <>
              <PillButton primary onClick={onRetry}>
                Try again
              </PillButton>
              <PillButton onClick={onDiscover}>View my orders</PillButton>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function PillButton({
  primary,
  onClick,
  children,
}: {
  primary?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-5 py-2.5 text-[13px] font-bold transition-colors',
        primary
          ? 'bg-primary text-primary-foreground hover:opacity-90'
          : 'border border-border hover:border-primary hover:text-primary',
      )}
    >
      {children}
    </button>
  )
}
