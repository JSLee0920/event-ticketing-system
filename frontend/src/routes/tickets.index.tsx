import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { MyTickets } from '#/components/tickets/MyTickets'

export const Route = createFileRoute('/tickets/')({ component: TicketsPage })

function TicketsPage() {
  return (
    <AppLayout active="tickets" title="My Tickets">
      <MyTickets />
    </AppLayout>
  )
}
