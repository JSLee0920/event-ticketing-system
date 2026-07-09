import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'

type PayResult = 'success' | 'fail'

export function PaymentCard({
  total,
  onPay,
}: {
  total: number
  onPay: (outcome: PayResult) => void
}) {
  return (
    <div className="rounded-[18px] border border-border bg-card p-[26px] shadow-card">
      <div className="font-display text-[20px] font-extrabold">Payment</div>
      <p className="mt-1 text-[12.5px] text-muted-foreground">
        This is a mock payment — no card is charged.
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <Field id="card-name" label="Name on card" placeholder="Jamie Rivera" />
        <Field
          id="card-number"
          label="Card number"
          placeholder="4242 4242 4242 4242"
          inputMode="numeric"
        />
        <div className="grid grid-cols-2 gap-3">
          <Field id="card-exp" label="Expiry" placeholder="MM / YY" />
          <Field
            id="card-cvc"
            label="CVC"
            placeholder="123"
            inputMode="numeric"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onPay('success')}
        className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
      >
        Pay ${total}
      </button>
      <button
        type="button"
        onClick={() => onPay('fail')}
        className="mt-3 w-full text-center text-[12.5px] font-semibold text-muted-foreground underline hover:text-destructive"
      >
        Simulate a declined card
      </button>
    </div>
  )
}

function Field({
  id,
  label,
  ...props
}: React.ComponentProps<typeof Input> & { id: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={id}
        className="text-[12.5px] font-semibold text-muted-foreground"
      >
        {label}
      </Label>
      <Input
        id={id}
        className="h-auto rounded-xl border-[1.5px] px-4 py-3 text-sm"
        {...props}
      />
    </div>
  )
}
