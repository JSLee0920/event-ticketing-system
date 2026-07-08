export type OrderStatus = 'Confirmed' | 'Refunded'

export type UserOrder = {
  id: string
  eventTitle: string
  summary: string
  placed: string
  total: number
  status: OrderStatus
}

// Placeholder orders; swap for GET /api/orders (for the current user) once the
// endpoint exists.
export const SAMPLE_ORDERS: UserOrder[] = [
  {
    id: 'ORD-1043',
    eventTitle: 'Midnight Frequencies Tour',
    summary: '2 × VIP · placed Jul 2, 2026',
    placed: 'Jul 2, 2026',
    total: 130,
    status: 'Confirmed',
  },
  {
    id: 'ORD-1017',
    eventTitle: 'Harbor Jazz Nights',
    summary: '1 × Table Seat · placed Jun 28, 2026',
    placed: 'Jun 28, 2026',
    total: 78,
    status: 'Confirmed',
  },
  {
    id: 'ORD-0992',
    eventTitle: 'City Derby Finals',
    summary: '2 × Reserved Seat · placed Jun 14, 2026',
    placed: 'Jun 14, 2026',
    total: 104,
    status: 'Refunded',
  },
]
