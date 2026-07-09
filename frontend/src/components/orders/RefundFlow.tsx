import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { RotateCcw } from 'lucide-react'

type Stage = 'idle' | 'confirm' | 'requested'

export function RefundFlow({
  orderId,
  total,
}: {
  orderId: string
  total: number
}) {
  const [stage, setStage] = useState<Stage>('idle')

  if (stage === 'requested') {
    return (
      <div className="mt-5">
        <div className="flex gap-3 rounded-[14px] border border-info bg-info-bg px-4 py-3.5 text-info">
          <span className="flex size-8 flex-none items-center justify-center rounded-full bg-info/15">
            <RotateCcw className="size-[16px]" strokeWidth={2.2} />
          </span>
          <div>
            <div className="text-[13.5px] font-bold">Refund Requested</div>
            <div className="mt-0.5 text-[12.5px]">
              We’ve notified the organizer. You’ll get an email once it’s
              processed.
            </div>
          </div>
        </div>
        <PolicyNote />
      </div>
    )
  }

  if (stage === 'confirm') {
    return (
      <div className="mt-5">
        <div className="rounded-[14px] border-[1.5px] border-destructive p-4">
          <div className="text-[14px] font-bold">
            Request a refund for {orderId}?
          </div>
          <p className="mt-1 text-[12.5px] text-muted-foreground">
            Your tickets will be voided and ${total} returned to your card in
            5–7 business days.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setStage('requested')}
              className="rounded-full bg-destructive px-4 py-2 text-[12.5px] font-bold text-white transition-opacity hover:opacity-90"
            >
              Confirm Refund Request
            </button>
            <button
              type="button"
              onClick={() => setStage('idle')}
              className="rounded-full border border-border px-4 py-2 text-[12.5px] font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Keep My Tickets
            </button>
          </div>
        </div>
        <PolicyNote />
      </div>
    )
  }

  return (
    <div className="mt-5">
      <div className="flex flex-wrap gap-2">
        <Link
          to="/tickets"
          className="rounded-full bg-primary px-4 py-2.5 text-[12.5px] font-bold text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          View Tickets
        </Link>
        <button
          type="button"
          onClick={() => {
            // TODO: swap for GET /api/orders/{orderId}/receipt (PDF download)
            window.print()
          }}
          className="rounded-full border border-border px-4 py-2.5 text-[12.5px] font-semibold transition-colors hover:border-primary hover:text-primary"
        >
          Download Receipt
        </button>
        <button
          type="button"
          onClick={() => setStage('confirm')}
          className="rounded-full border border-destructive px-4 py-2.5 text-[12.5px] font-semibold text-destructive transition-opacity hover:opacity-80"
        >
          Request Refund
        </button>
      </div>
      <PolicyNote />
    </div>
  )
}

function PolicyNote() {
  return (
    <p className="mt-3 text-[11.5px] text-faint">
      Refunds are available until 48 hours before the event starts.
    </p>
  )
}
