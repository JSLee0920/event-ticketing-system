import { DollarSign, Ticket, Receipt, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Kpi = {
  label: string
  value: string
  delta?: string
  icon: LucideIcon
  // Literal Tailwind classes so JIT can scan them (hues can't be built at runtime).
  cardClass: string
  iconClass: string
}

// Placeholder metrics; swap for GET /api/organizer/metrics once available.
export const KPIS: Kpi[] = [
  {
    label: 'Gross Revenue',
    value: '$25,978',
    delta: '▲ 18%',
    icon: DollarSign,
    cardClass:
      'bg-[color-mix(in_srgb,#CA6702_10%,var(--card))] border-[color-mix(in_srgb,#CA6702_30%,var(--card))]',
    iconClass: 'bg-[color-mix(in_srgb,#CA6702_20%,var(--card))] text-[#CA6702]',
  },
  {
    label: 'Tickets Sold',
    value: '1,204',
    delta: '▲ 9%',
    icon: Ticket,
    cardClass:
      'bg-[color-mix(in_srgb,#0A9396_10%,var(--card))] border-[color-mix(in_srgb,#0A9396_30%,var(--card))]',
    iconClass: 'bg-[color-mix(in_srgb,#0A9396_20%,var(--card))] text-[#0A9396]',
  },
  {
    label: 'Orders',
    value: '712',
    delta: '▲ 6%',
    icon: Receipt,
    cardClass:
      'bg-[color-mix(in_srgb,#0E8074_10%,var(--card))] border-[color-mix(in_srgb,#0E8074_30%,var(--card))]',
    iconClass: 'bg-[color-mix(in_srgb,#0E8074_20%,var(--card))] text-[#0E8074]',
  },
  {
    label: 'Attendance Rate',
    value: '89%',
    icon: Users,
    cardClass:
      'bg-[color-mix(in_srgb,#005F73_10%,var(--card))] border-[color-mix(in_srgb,#005F73_30%,var(--card))]',
    iconClass: 'bg-[color-mix(in_srgb,#005F73_20%,var(--card))] text-[#005F73]',
  },
]

export type RevenueRow = { event: string; amount: number }

export const REVENUE_BY_EVENT: RevenueRow[] = [
  { event: 'Midnight Frequencies Tour', amount: 9840 },
  { event: 'Harbor Jazz Nights', amount: 6420 },
  { event: 'City Derby Finals', amount: 5310 },
  { event: 'Night Market Eats', amount: 2560 },
  { event: 'Brush & Barrel', amount: 1848 },
]

export type SalesPoint = { label: string; value: number }

// Sales over the last 14 days.
export const SALES_OVER_TIME: SalesPoint[] = [
  { label: 'M', value: 620 },
  { label: 'T', value: 810 },
  { label: 'W', value: 540 },
  { label: 'T', value: 980 },
  { label: 'F', value: 1220 },
  { label: 'S', value: 1640 },
  { label: 'S', value: 1180 },
  { label: 'M', value: 720 },
  { label: 'T', value: 900 },
  { label: 'W', value: 1040 },
  { label: 'T', value: 1320 },
  { label: 'F', value: 1500 },
  { label: 'S', value: 1780 },
  { label: 'S', value: 1360 },
]
