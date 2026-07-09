import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { MANAGED_EVENTS } from './managed-events'
import { TierRepeater, newTier } from './TierRepeater'
import type { TierDraft } from './TierRepeater'

const CATEGORIES = ['Music', 'Sports', 'Comedy', 'Arts', 'Food']

const CONTROL_CLASS =
  'w-full rounded-xl border-[1.5px] border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary'

// Prefill from placeholder data in edit mode; swap for GET /api/events/{id}.
function initialTiers(eventId?: string): TierDraft[] {
  const event = eventId
    ? MANAGED_EVENTS.find((e) => e.id === eventId)
    : undefined
  if (!event) return [newTier()]
  return event.tiers.map((t) => ({
    id: crypto.randomUUID(),
    name: t.name,
    price: '',
    qty: String(t.total),
  }))
}

export function EventForm({ eventId }: { eventId?: string }) {
  const navigate = useNavigate()
  const editing = Boolean(eventId)
  const existing = eventId
    ? MANAGED_EVENTS.find((e) => e.id === eventId)
    : undefined

  const [title, setTitle] = useState(existing?.title ?? '')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState(existing?.venue ?? '')
  const [address, setAddress] = useState('')
  const [capacity, setCapacity] = useState('')
  const [tiers, setTiers] = useState<TierDraft[]>(() => initialTiers(eventId))

  function done() {
    // TODO: POST/PUT /api/events — persist draft/published event.
    navigate({ to: '/organizer/events' })
  }

  return (
    <div className="px-4 pb-[60px] sm:px-10">
      <Link
        to="/organizer/events"
        className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-muted-foreground no-underline hover:text-primary"
      >
        <ArrowLeft className="size-[15px]" strokeWidth={2.2} />
        Back To Your Events
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-[28px] font-semibold leading-[1.06] tracking-[-0.04em]">
          {editing ? 'Edit Event' : 'Create Event'}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={done}
            className="rounded-full border border-border px-4 py-2.5 text-[13px] font-semibold transition-colors hover:border-primary hover:text-primary"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={done}
            className="rounded-full bg-primary px-[22px] py-2.5 text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-4 rounded-[18px] border border-border bg-card p-6 shadow-card">
          <Field label="Event Title">
            <input
              className={CONTROL_CLASS}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Midnight Frequencies Tour"
            />
          </Field>
          <Field label="Category">
            <select
              className={CONTROL_CLASS}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Description">
            <textarea
              className={`${CONTROL_CLASS} min-h-[120px] resize-y`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell attendees what to expect…"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input
                type="date"
                className={CONTROL_CLASS}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Field>
            <Field label="Time">
              <input
                type="time"
                className={CONTROL_CLASS}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Field>
          </div>
          <Field label="Venue">
            <input
              className={CONTROL_CLASS}
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="The Warehouse"
            />
          </Field>
          <Field label="Address">
            <input
              className={CONTROL_CLASS}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Harbor St, Portland"
            />
          </Field>
          <Field label="Capacity">
            <input
              inputMode="numeric"
              className={CONTROL_CLASS}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              placeholder="720"
            />
          </Field>
        </div>

        <div className="flex flex-col gap-3 rounded-[18px] border border-border bg-card p-6 shadow-card">
          <div>
            <div className="text-[15px] font-bold">Ticket Tiers</div>
            <div className="mt-0.5 text-[12.5px] text-muted-foreground">
              Add one row per ticket type.
            </div>
          </div>
          <TierRepeater tiers={tiers} onChange={setTiers} />
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12.5px] font-semibold text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
