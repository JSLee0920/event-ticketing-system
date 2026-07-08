// Ticket-stub divider: dashed line with punched half-circles at both edges.
// Shared by the Event-detail tickets card and the Checkout order summary.
export function TicketStub() {
  return (
    <div className="relative my-4 flex items-center">
      <div className="absolute -left-[22px] size-4 rounded-full bg-surface" />
      <div className="flex-1 border-t-2 border-dashed border-border" />
      <div className="absolute -right-[22px] size-4 rounded-full bg-surface" />
    </div>
  )
}
