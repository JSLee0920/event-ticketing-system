export type AttendeeStatus = 'Confirmed' | 'Refunded'

export type Attendee = {
  id: string
  name: string
  email: string
  ticket: string
  tier: string
  status: AttendeeStatus
}

// Placeholder data; swap for GET /api/organizer/events/{id}/attendees once available.
export const ATTENDEES: Attendee[] = [
  { id: 'a1', name: 'Jordan Torres', email: 'jordan.t@example.com', ticket: 'TH-8F3K-92QX', tier: 'VIP', status: 'Confirmed' },
  { id: 'a2', name: 'Priya Nair', email: 'priya.nair@example.com', ticket: 'TH-2C7D-41LP', tier: 'General', status: 'Confirmed' },
  { id: 'a3', name: 'Marcus Lee', email: 'marcus.lee@example.com', ticket: 'TH-9G1A-77RT', tier: 'General', status: 'Refunded' },
  { id: 'a4', name: 'Sofia Almeida', email: 'sofia.a@example.com', ticket: 'TH-5K3M-08WZ', tier: 'VIP', status: 'Confirmed' },
  { id: 'a5', name: 'Ethan Brooks', email: 'ethan.brooks@example.com', ticket: 'TH-4Q6N-33YB', tier: 'General', status: 'Confirmed' },
  { id: 'a6', name: 'Hana Kim', email: 'hana.kim@example.com', ticket: 'TH-1P8V-62JD', tier: 'General', status: 'Confirmed' },
  { id: 'a7', name: 'Diego Ramos', email: 'diego.r@example.com', ticket: 'TH-7B2X-19KF', tier: 'VIP', status: 'Refunded' },
  { id: 'a8', name: 'Aisha Rahman', email: 'aisha.r@example.com', ticket: 'TH-3D9C-84MQ', tier: 'General', status: 'Confirmed' },
  { id: 'a9', name: 'Liam O’Connor', email: 'liam.oc@example.com', ticket: 'TH-6H4T-27PL', tier: 'General', status: 'Confirmed' },
  { id: 'a10', name: 'Yuki Tanaka', email: 'yuki.t@example.com', ticket: 'TH-8N5R-53VC', tier: 'VIP', status: 'Confirmed' },
  { id: 'a11', name: 'Grace Miller', email: 'grace.m@example.com', ticket: 'TH-2F7K-90ZB', tier: 'General', status: 'Confirmed' },
  { id: 'a12', name: 'Omar Haddad', email: 'omar.h@example.com', ticket: 'TH-9L1D-46QT', tier: 'General', status: 'Confirmed' },
]
