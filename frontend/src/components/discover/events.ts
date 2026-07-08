import { Music, Mic, Palette, Trophy, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type EventCategory = 'Music' | 'Sports' | 'Comedy' | 'Arts' | 'Food'

export const CATEGORY_ICON: Record<EventCategory, LucideIcon> = {
  Music,
  Sports: Trophy,
  Comedy: Mic,
  Arts: Palette,
  Food: Utensils,
}

export type DiscoverEvent = {
  id: string
  title: string
  when: string
  venue: string
  category: EventCategory
  priceLabel: string | null
  scarcity?: string
  soldOut?: boolean
}

export type EventTier = {
  id: string
  name: string
  description: string
  price: number
  // Units left for this tier. 0 = sold out (offer waitlist instead of stepper).
  remaining: number
}

export type EventDetail = DiscoverEvent & {
  address: string
  capacity: string
  organizer: string
  about: string
  tiers: EventTier[]
}

// Placeholder data mirroring the design; swap for GET /api/events once the
// summary DTO carries category, price, and availability.
export const SAMPLE_EVENTS: DiscoverEvent[] = [
  {
    id: 'e1',
    title: 'Midnight Frequencies Tour',
    when: 'Sat, Jul 11 · 8:00 PM',
    venue: 'The Armory',
    category: 'Music',
    priceLabel: 'from $25',
    scarcity: 'VIP: only 12 left',
  },
  {
    id: 'e2',
    title: 'Late Night Laughs',
    when: 'Sun, Jul 12 · 9:30 PM',
    venue: 'Basement Club',
    category: 'Comedy',
    priceLabel: null,
    soldOut: true,
  },
  {
    id: 'e3',
    title: 'City Derby Finals',
    when: 'Sun, Jul 12 · 3:00 PM',
    venue: 'Riverside Stadium',
    category: 'Sports',
    priceLabel: 'from $28',
  },
  {
    id: 'e4',
    title: 'Harbor Jazz Nights',
    when: 'Thu, Jul 16 · 7:00 PM',
    venue: 'Pier 9 Pavilion',
    category: 'Music',
    priceLabel: 'from $38',
    scarcity: 'Table seats: only 8 left',
  },
  {
    id: 'e5',
    title: 'Brush & Barrel: Open studio',
    when: 'Fri, Jul 17 · 6:00 PM',
    venue: 'Fairfield Gallery',
    category: 'Arts',
    priceLabel: '$15',
    scarcity: 'Only 16 left',
  },
  {
    id: 'e6',
    title: 'Night Market Eats',
    when: 'Sat, Jul 18 · 5:00 PM',
    venue: 'Pier 9',
    category: 'Food',
    priceLabel: 'from $10',
  },
]

type EventExtra = {
  address: string
  capacity: string
  organizer: string
  about: string
  tiers: EventTier[]
}

// Detail-only fields, keyed by event id. Merged with the summary in
// getEventDetail. Swap for GET /api/events/{id} once the DTO carries tiers.
const EVENT_EXTRAS: Record<string, EventExtra> = {
  e1: {
    address: '9 Grand Concourse, Arts District',
    capacity: '1,800 capacity',
    organizer: 'Night Owl Presents',
    about:
      'A late-night electronic showcase spanning four acts across two stages. Doors open one hour before start; expect deep bass, visual mapping, and a rooftop bar.',
    tiers: [
      {
        id: 't-ga',
        name: 'General Admission',
        description: 'Standing floor access',
        price: 25,
        remaining: 140,
      },
      {
        id: 't-vip',
        name: 'VIP',
        description: 'Front stage + lounge access',
        price: 65,
        remaining: 12,
      },
      {
        id: 't-table',
        name: 'Table (seats 4)',
        description: 'Reserved balcony table',
        price: 240,
        remaining: 0,
      },
    ],
  },
  e2: {
    address: '14 Cellar Lane, Old Town',
    capacity: '120 capacity',
    organizer: 'Basement Comedy Co.',
    about:
      'An intimate night of stand-up from touring headliners and local openers. One drink minimum; strictly 18+.',
    tiers: [
      {
        id: 't-ga',
        name: 'General Admission',
        description: 'Open seating',
        price: 22,
        remaining: 0,
      },
      {
        id: 't-front',
        name: 'Front Row',
        description: 'Reserved front tables',
        price: 40,
        remaining: 0,
      },
    ],
  },
  e3: {
    address: 'Riverside Stadium, Gate C',
    capacity: '9,500 capacity',
    organizer: 'City Roller League',
    about:
      'The championship-deciding derby final. Bring a scarf — the home stand gets loud. Concessions open two hours before bout.',
    tiers: [
      {
        id: 't-ga',
        name: 'Standing Terrace',
        description: 'Behind the bench',
        price: 28,
        remaining: 320,
      },
      {
        id: 't-seat',
        name: 'Reserved Seat',
        description: 'Trackside seating',
        price: 52,
        remaining: 88,
      },
    ],
  },
  e4: {
    address: 'Pier 9 Pavilion, Harborfront',
    capacity: '600 capacity',
    organizer: 'Harbor Sessions',
    about:
      'An evening of modern jazz on the water. Table service available; sets run through to midnight.',
    tiers: [
      {
        id: 't-ga',
        name: 'General Admission',
        description: 'Standing + bar',
        price: 38,
        remaining: 210,
      },
      {
        id: 't-table',
        name: 'Table Seat',
        description: 'Shared harbor-view table',
        price: 78,
        remaining: 8,
      },
    ],
  },
  e5: {
    address: 'Fairfield Gallery, Studio 2',
    capacity: '40 capacity',
    organizer: 'Brush & Barrel',
    about:
      'A guided open-studio painting session with wine. All materials included; no experience needed.',
    tiers: [
      {
        id: 't-ga',
        name: 'Studio Pass',
        description: 'Includes materials + one drink',
        price: 15,
        remaining: 16,
      },
    ],
  },
  e6: {
    address: 'Pier 9, East Lawn',
    capacity: 'Open air',
    organizer: 'Night Market Collective',
    about:
      'Forty street-food vendors, live music, and a craft market. Entry ticket covers admission; food sold on-site.',
    tiers: [
      {
        id: 't-ga',
        name: 'Entry',
        description: 'General admission',
        price: 10,
        remaining: 500,
      },
      {
        id: 't-early',
        name: 'Early Bird (5–6 PM)',
        description: 'Beat the queues',
        price: 18,
        remaining: 60,
      },
    ],
  },
}

export function getEventDetail(id: string): EventDetail | null {
  const base = SAMPLE_EVENTS.find((e) => e.id === id)
  const extra = EVENT_EXTRAS[id]
  if (!base || !extra) return null
  return { ...base, ...extra }
}
