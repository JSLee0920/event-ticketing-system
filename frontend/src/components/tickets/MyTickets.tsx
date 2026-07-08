import { useState } from 'react'
import { cn } from '#/lib/utils'
import { SAMPLE_TICKETS } from './tickets'
import type { UserTicket } from './tickets'
import { TicketCard } from './TicketCard'
import { QrModal } from './QrModal'

type Tab = 'upcoming' | 'past'

export function MyTickets() {
  const [tab, setTab] = useState<Tab>('upcoming')
  const [active, setActive] = useState<UserTicket | null>(null)

  const tickets = SAMPLE_TICKETS.filter((t) =>
    tab === 'upcoming' ? !t.past : t.past,
  )

  return (
    <div className="px-4 pb-[60px] sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-3 pt-7 sm:pt-11">
        <h2 className="font-display text-[28px] font-semibold leading-[1.06] tracking-[-0.04em]">
          My Tickets
        </h2>
        <div className="flex gap-1 rounded-full border border-border bg-card p-1">
          <TabButton active={tab === 'upcoming'} onClick={() => setTab('upcoming')}>
            Upcoming
          </TabButton>
          <TabButton active={tab === 'past'} onClick={() => setTab('past')}>
            Past
          </TabButton>
        </div>
      </div>

      {tickets.length > 0 ? (
        <div className="grid grid-cols-1 gap-[18px] pt-7 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onViewQr={() => setActive(ticket)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-7 rounded-[18px] border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          {tab === 'upcoming'
            ? 'No upcoming tickets yet.'
            : 'No past tickets yet.'}
        </div>
      )}

      {active && <QrModal ticket={active} onClose={() => setActive(null)} />}
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full px-4 py-1.5 text-[12.5px] font-semibold transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
