import { Link } from '@tanstack/react-router'
import { Ticket } from 'lucide-react'

export function EmptyCart() {
  return (
    <div className="px-10 pb-[60px] pt-16">
      <div className="mx-auto max-w-[420px] rounded-[18px] border border-dashed border-border bg-card p-10 text-center shadow-card">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-dashed border-border text-faint">
          <Ticket className="size-6" strokeWidth={2} />
        </div>
        <h1 className="mt-4 text-[17px] font-bold">Your Cart Is Empty</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add tickets from an event to check out.
        </p>
        <Link
          to="/"
          className="mt-5 inline-block rounded-full bg-primary px-5 py-2.5 text-[13px] font-bold text-primary-foreground no-underline hover:opacity-90"
        >
          Browse Events
        </Link>
      </div>
    </div>
  )
}
