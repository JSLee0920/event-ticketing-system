export type OrderStatus = 'Confirmed' | 'Refunded'

export type UserOrder = {
  id: string
  eventTitle: string
  summary: string
  placed: string
  total: number
  status: OrderStatus
}

export type OrderLine = { label: string; qty: number; price: number }

export type OrderDetail = UserOrder & {
  when: string
  venue: string
  paymentMethod: string
  lines: OrderLine[]
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

// Detail-only fields, keyed by order id. Merged with the summary in
// getOrderDetail. Swap for GET /api/orders/{id} once the endpoint exists.
const ORDER_EXTRAS: Record<
  string,
  Omit<OrderDetail, keyof UserOrder>
> = {
  'ORD-1043': {
    when: 'Sat, Jul 11 · 8:00 PM',
    venue: 'The Armory',
    paymentMethod: 'Visa •••• 4242',
    lines: [{ label: 'VIP', qty: 2, price: 65 }],
  },
  'ORD-1017': {
    when: 'Thu, Jul 16 · 7:00 PM',
    venue: 'Pier 9 Pavilion',
    paymentMethod: 'Visa •••• 4242',
    lines: [{ label: 'Table Seat', qty: 1, price: 78 }],
  },
  'ORD-0992': {
    when: 'Sun, Jun 21 · 3:00 PM',
    venue: 'Riverside Stadium',
    paymentMethod: 'Mastercard •••• 6621',
    lines: [{ label: 'Reserved Seat', qty: 2, price: 52 }],
  },
}

export function getOrderDetail(id: string): OrderDetail | null {
  const base = SAMPLE_ORDERS.find((o) => o.id === id)
  const extra = ORDER_EXTRAS[id]
  if (!base || !extra) return null
  return { ...base, ...extra }
}
