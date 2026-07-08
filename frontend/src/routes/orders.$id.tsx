import { createFileRoute, Link } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { OrderDetail } from '#/components/orders/OrderDetail'
import { getOrderDetail } from '#/components/orders/orders'

export const Route = createFileRoute('/orders/$id')({
  component: OrderDetailPage,
})

function OrderDetailPage() {
  const { id } = Route.useParams()
  const order = getOrderDetail(id)

  return (
    <AppLayout active="orders" title="Order">
      {order ? (
        <OrderDetail order={order} />
      ) : (
        <div className="px-4 pb-[60px] pt-16 text-center sm:px-10">
          <div className="text-sm text-muted-foreground">
            That order doesn’t exist.
          </div>
          <Link
            to="/orders"
            className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Back to orders
          </Link>
        </div>
      )}
    </AppLayout>
  )
}
