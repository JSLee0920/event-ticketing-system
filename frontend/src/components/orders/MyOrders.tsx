import { SAMPLE_ORDERS } from './orders'
import { OrderCard } from './OrderCard'

export function MyOrders() {
  const orders = SAMPLE_ORDERS

  return (
    <div className="px-4 pb-[60px] sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-3 pt-7 sm:pt-11">
        <h2 className="font-display text-[28px] font-semibold leading-[1.06] tracking-[-0.04em]">
          My Orders
        </h2>
        <span className="text-[13px] text-muted-foreground">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      {orders.length > 0 ? (
        <div className="flex flex-col gap-3 pt-7">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-[18px] border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          You haven’t placed any orders yet.
        </div>
      )}
    </div>
  )
}
