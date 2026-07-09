import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { Checkout } from '#/components/checkout/Checkout'

export const Route = createFileRoute('/checkout')({ component: CheckoutPage })

function CheckoutPage() {
  return (
    <AppLayout active="discover" title="Checkout">
      <Checkout />
    </AppLayout>
  )
}
