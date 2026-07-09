export type Payout = {
  id: string
  date: string
  account: string
  amount: number
  status: 'Paid'
}

// Placeholder data; swap for GET /api/organizer/payouts once available.
export const PAYOUT_BALANCE = {
  available: 8420,
  nextDate: 'Mon, Jul 14',
  account: '•••• 6621',
}

export const PAYOUT_HISTORY: Payout[] = [
  { id: 'po-1', date: 'Jul 7, 2026', account: '•••• 6621', amount: 4200, status: 'Paid' },
  { id: 'po-2', date: 'Jun 30, 2026', account: '•••• 6621', amount: 3860, status: 'Paid' },
  { id: 'po-3', date: 'Jun 23, 2026', account: '•••• 6621', amount: 5120, status: 'Paid' },
  { id: 'po-4', date: 'Jun 16, 2026', account: '•••• 6621', amount: 2940, status: 'Paid' },
]
