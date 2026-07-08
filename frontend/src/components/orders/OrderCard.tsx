import { cn } from '#/lib/utils'
import type { UserOrder } from './orders'

export function OrderCard({ order }: { order: UserOrder }) {
  return (
    <div className="rounded-[18px] border border-border bg-card p-5 shadow-card transition-colors hover:border-primary">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[14px] font-bold">{order.id}</span>
        <StatusChip status={order.status} />
      </div>

      <div className="mt-2 text-[14px] font-semibold leading-[1.3]">
        {order.eventTitle}
      </div>
      <div className="mt-0.5 text-[12.5px] text-muted-foreground">
        {order.summary}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="font-display text-[16px] font-extrabold">
          ${order.total}
        </span>
        <div className="flex gap-2">
          <PillLink>Details</PillLink>
          <PillLink>View tickets</PillLink>
        </div>
      </div>
    </div>
  )
}

function StatusChip({ status }: { status: UserOrder['status'] }) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-1 text-[11px] font-bold',
        status === 'Confirmed'
          ? 'bg-ok-bg text-ok'
          : 'bg-info-bg text-info',
      )}
    >
      {status}
    </span>
  )
}

function PillLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-full border border-border px-4 py-2 text-[12px] font-semibold transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </button>
  )
}
