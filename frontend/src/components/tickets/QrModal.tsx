import { X } from 'lucide-react'
import type { UserTicket } from './tickets'

// Procedurally faked QR — a deterministic pattern seeded from the ticket code.
// Swap for a real QR library encoding `ticket.code` before go-live.
const GRID = 21

function cellsFor(code: string): boolean[] {
  let seed = 0
  for (const ch of code) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0
  return Array.from({ length: GRID * GRID }, (_, i) => {
    seed = (seed * 1103515245 + 12345 + i) >>> 0
    return ((seed >> 16) & 1) === 1
  })
}

export function QrModal({
  ticket,
  onClose,
}: {
  ticket: UserTicket
  onClose: () => void
}) {
  const cells = cellsFor(ticket.code)

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="fixed inset-0 bg-black/50"
      />
      <div className="relative w-full max-w-[340px] rounded-[18px] border border-border bg-card p-6 text-center shadow-card">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          title="Close"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-[10px] text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <X className="size-[18px]" strokeWidth={2} />
        </button>

        <h2 className="text-[15px] font-bold">{ticket.eventTitle}</h2>
        <p className="mt-0.5 text-[12.5px] text-muted-foreground">
          {ticket.tier} · {ticket.holder}
        </p>

        <div
          className="mx-auto mt-5 grid aspect-square w-[220px] max-w-full gap-0 rounded-[10px] border border-border bg-white p-3"
          style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}
        >
          {cells.map((on, i) => (
            <div key={i} className={on ? 'bg-black' : 'bg-white'} />
          ))}
        </div>

        <div className="mt-4 font-mono text-[13px] font-bold tracking-[0.08em]">
          {ticket.code}
        </div>
      </div>
    </div>
  )
}
