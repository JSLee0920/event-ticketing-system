import { Plus, X } from 'lucide-react'

export type TierDraft = {
  id: string
  name: string
  price: string
  qty: string
}

export function newTier(): TierDraft {
  return { id: crypto.randomUUID(), name: '', price: '', qty: '' }
}

const INPUT_CLASS =
  'w-full rounded-xl border-[1.5px] border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-primary'

export function TierRepeater({
  tiers,
  onChange,
}: {
  tiers: TierDraft[]
  onChange: (next: TierDraft[]) => void
}) {
  function update(index: number, patch: Partial<TierDraft>) {
    onChange(tiers.map((t, i) => (i === index ? { ...t, ...patch } : t)))
  }

  function remove(index: number) {
    onChange(tiers.filter((_, i) => i !== index))
  }

  function add() {
    onChange([...tiers, newTier()])
  }

  return (
    <div className="flex flex-col gap-2.5">
      {tiers.map((tier, i) => (
        <div key={tier.id} className="flex items-center gap-2">
          <input
            className={INPUT_CLASS}
            placeholder="Tier name"
            value={tier.name}
            onChange={(e) => update(i, { name: e.target.value })}
          />
          <input
            className={`${INPUT_CLASS} max-w-[110px]`}
            placeholder="Price"
            inputMode="decimal"
            value={tier.price}
            onChange={(e) => update(i, { price: e.target.value })}
          />
          <input
            className={`${INPUT_CLASS} max-w-[110px]`}
            placeholder="Qty"
            inputMode="numeric"
            value={tier.qty}
            onChange={(e) => update(i, { qty: e.target.value })}
          />
          <button
            type="button"
            aria-label="Remove tier"
            onClick={() => remove(i)}
            className="flex size-9 flex-none items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
          >
            <X className="size-[17px]" strokeWidth={2} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 self-start rounded-full border border-dashed border-border px-4 py-2 text-[12.5px] font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <Plus className="size-[14px]" strokeWidth={2.4} />
        Add Tier
      </button>
    </div>
  )
}
