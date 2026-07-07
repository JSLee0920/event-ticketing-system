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
