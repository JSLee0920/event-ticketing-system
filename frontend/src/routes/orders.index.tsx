import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { MyOrders } from '#/components/orders/MyOrders'

export const Route = createFileRoute('/orders/')({ component: OrdersPage })

function OrdersPage() {
  return (
    <AppLayout active="orders" title="My Orders">
      <MyOrders />
    </AppLayout>
  )
}
