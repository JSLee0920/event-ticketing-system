import { Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { cn } from '#/lib/utils'
import { TicketStub } from '#/components/common/TicketStub'
import { RefundFlow } from './RefundFlow'
import type { OrderDetail as OrderDetailData } from './orders'

export function OrderDetail({ order }: { order: OrderDetailData }) {
  const refunded = order.status === 'Refunded'

  return (
    <div className="px-4 pb-[60px] pt-6 sm:px-10 sm:pt-8">
      <Link
        to="/orders"
        className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-muted-foreground no-underline hover:text-primary"
      >
        <ArrowLeft className="size-[15px]" strokeWidth={2.2} />
        Back to orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-[26px] font-semibold tracking-[-0.03em] sm:text-[28px]">
          {order.id}
        </h1>
        <span
          className={cn(
            'rounded-full px-2.5 py-1 text-[11px] font-bold',
            refunded ? 'bg-info-bg text-info' : 'bg-ok-bg text-ok',
          )}
        >
          {order.status}
        </span>
      </div>
      <div className="mt-1 text-[12.5px] text-muted-foreground">
        Placed {order.placed} · paid with {order.paymentMethod}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
        <div className="rounded-[18px] border border-border bg-card p-5 shadow-card">
          <div className="text-[15px] font-bold">{order.eventTitle}</div>
          <div className="mt-0.5 text-[12.5px] text-muted-foreground">
            {order.when} · {order.venue}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {order.lines.map((line) => (
              <div
                key={line.label}
                className="flex items-center justify-between text-[13.5px]"
              >
                <span>
                  {line.label} × {line.qty}
                </span>
                <span className="font-semibold">
                  ${line.price * line.qty}
                </span>
              </div>
            ))}
          </div>

          <TicketStub />

          <div className="flex items-center justify-between">
            <span className="text-[12.5px] text-muted-foreground">
              Total · fees included
            </span>
            <span className="font-display text-[18px] font-extrabold">
              ${order.total}
            </span>
          </div>
        </div>

        <div className="rounded-[18px] border border-border bg-card p-5 shadow-card">
          <div className="text-[14px] font-bold">Payment</div>
          <div className="mt-1 text-[12.5px] text-muted-foreground">
            {order.paymentMethod} · charged {order.placed}
          </div>
          <span
            className={cn(
              'mt-3 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold',
              refunded ? 'bg-info-bg text-info' : 'bg-ok-bg text-ok',
            )}
          >
            {refunded ? 'Refunded' : 'Success'}
          </span>
        </div>
      </div>

      {!refunded && <RefundFlow orderId={order.id} total={order.total} />}
    </div>
  )
}
