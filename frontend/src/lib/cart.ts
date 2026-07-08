// Lightweight in-memory cart hand-off between Event detail and Checkout.
// Mock-only: a module singleton, not reactive — Checkout reads it once on mount.
// Swap for a server cart / order draft once the backend exists.

export type CartLine = {
  tierId: string
  name: string
  price: number
  qty: number
}

export type Cart = {
  eventId: string
  eventTitle: string
  when: string
  lines: CartLine[]
}

let current: Cart | null = null

export function setCart(cart: Cart): void {
  current = cart
}

export function getCart(): Cart | null {
  return current
}

export function clearCart(): void {
  current = null
}
