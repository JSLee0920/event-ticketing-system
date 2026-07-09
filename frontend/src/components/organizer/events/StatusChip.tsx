import { cn } from '#/lib/utils'
import type { EventStatus } from './managed-events'

const STYLES: Record<EventStatus, string> = {
  'On Sale': 'bg-ok-bg text-ok',
  'Sold Out': 'bg-secondary text-faint',
  Cancelled: 'bg-err-bg text-destructive',
}

export function StatusChip({ status }: { status: EventStatus }) {
  return (
    <span
      className={cn(
        'rounded-full px-2.5 py-1 text-[11px] font-bold',
        STYLES[status],
      )}
    >
      {status}
    </span>
  )
}
