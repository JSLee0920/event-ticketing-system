import { QrCode } from 'lucide-react'
import { TicketStub } from '#/components/common/TicketStub'
import type { UserTicket } from './tickets'

export function TicketCard({
  ticket,
  onViewQr,
}: {
  ticket: UserTicket
  onViewQr: () => void
}) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-border bg-card shadow-card transition-colors hover:border-primary">
      <div className="h-[150px] bg-[repeating-linear-gradient(45deg,var(--stripe-a)_0_10px,var(--stripe-b)_10px_20px)]" />

      <div className="px-5 pt-4">
        <div className="text-[15px] font-bold leading-[1.3] tracking-[-0.02em]">
          {ticket.eventTitle}
        </div>
        <div className="mt-1 text-[12.5px] text-muted-foreground">
          {ticket.tier} · {ticket.when}
        </div>
        <div className="mt-0.5 text-[12.5px] text-muted-foreground">
          {ticket.venue}
        </div>
      </div>

      <div className="px-5">
        <TicketStub />
      </div>

      <div className="flex items-center justify-between gap-3 px-5 pb-4">
        <span className="font-mono text-[12.5px] font-bold tracking-[0.06em] text-muted-foreground">
          {ticket.code}
        </span>
        <button
          type="button"
          onClick={onViewQr}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[12px] font-bold text-primary-foreground hover:opacity-90"
        >
          <QrCode className="size-[14px]" strokeWidth={2.2} />
          View QR
        </button>
      </div>
    </div>
  )
}
