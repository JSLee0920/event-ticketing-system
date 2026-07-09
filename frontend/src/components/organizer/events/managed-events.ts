export type EventStatus = 'On Sale' | 'Sold Out' | 'Cancelled'

export type TierAvailability = { name: string; sold: number; total: number }

export type ManagedEvent = {
  id: string
  title: string
  when: string
  venue: string
  status: EventStatus
  tiers: TierAvailability[]
  revenue: number
  scanned: number
  // Present only on cancelled events — shown as a dashed info box.
  cancelledNote?: string
}

// Placeholder data; swap for GET /api/organizer/events once available.
export const MANAGED_EVENTS: ManagedEvent[] = [
  {
    id: 'midnight-frequencies',
    title: 'Midnight Frequencies Tour',
    when: 'Sat, Jul 26 · 8:00 PM',
    venue: 'The Warehouse, Portland',
    status: 'On Sale',
    tiers: [
      { name: 'General', sold: 420, total: 600 },
      { name: 'VIP', sold: 88, total: 120 },
    ],
    revenue: 9840,
    scanned: 0,
  },
  {
    id: 'harbor-jazz-nights',
    title: 'Harbor Jazz Nights',
    when: 'Fri, Aug 1 · 7:30 PM',
    venue: 'Pier 9 Hall, Seattle',
    status: 'On Sale',
    tiers: [
      { name: 'Table Seat', sold: 72, total: 80 },
      { name: 'Standing', sold: 210, total: 300 },
    ],
    revenue: 6420,
    scanned: 0,
  },
  {
    id: 'city-derby-finals',
    title: 'City Derby Finals',
    when: 'Sun, Jun 22 · 6:00 PM',
    venue: 'Riverside Arena, Portland',
    status: 'Sold Out',
    tiers: [
      { name: 'Lower Bowl', sold: 500, total: 500 },
      { name: 'Upper Bowl', sold: 800, total: 800 },
    ],
    revenue: 5310,
    scanned: 1180,
  },
  {
    id: 'brush-and-barrel',
    title: 'Brush & Barrel',
    when: 'Sat, Jun 14 · 2:00 PM',
    venue: 'Old Town Studio, Portland',
    status: 'Cancelled',
    tiers: [{ name: 'Workshop', sold: 112, total: 150 }],
    revenue: 0,
    scanned: 0,
    cancelledNote:
      'Event cancelled on Jun 14. All 112 confirmed orders refunded to the original payment method.',
  },
]
