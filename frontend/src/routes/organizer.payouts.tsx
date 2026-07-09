import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { Payouts } from '#/components/organizer/payouts/Payouts'

export const Route = createFileRoute('/organizer/payouts')({
  component: PayoutsPage,
})

function PayoutsPage() {
  return (
    <AppLayout active="payouts" title="Payouts">
      <Payouts />
    </AppLayout>
  )
}
