import type { EventCategory } from '#/components/discover/events'

export type UserTicket = {
  id: string
  code: string
  eventTitle: string
  category: EventCategory
  tier: string
  when: string
  venue: string
  holder: string
  past: boolean
}

// Placeholder tickets; swap for GET /api/tickets (issued to the current user)
// once the endpoint exists.
export const SAMPLE_TICKETS: UserTicket[] = [
  {
    id: 'tk1',
    code: 'TH-8F3K-92QX',
    eventTitle: 'Midnight Frequencies Tour',
    category: 'Music',
    tier: 'VIP',
    when: 'Sat, Jul 11 · 8:00 PM',
    venue: 'The Armory',
    holder: 'Jordan Tan',
    past: false,
  },
  {
    id: 'tk2',
    code: 'TH-4M1P-77LZ',
    eventTitle: 'Harbor Jazz Nights',
    category: 'Music',
    tier: 'Table Seat',
    when: 'Thu, Jul 16 · 7:00 PM',
    venue: 'Pier 9 Pavilion',
    holder: 'Jordan Tan',
    past: false,
  },
  {
    id: 'tk3',
    code: 'TH-2C9D-05RB',
    eventTitle: 'City Derby Finals',
    category: 'Sports',
    tier: 'Reserved Seat',
    when: 'Sun, Jun 21 · 3:00 PM',
    venue: 'Riverside Stadium',
    holder: 'Jordan Tan',
    past: true,
  },
]
