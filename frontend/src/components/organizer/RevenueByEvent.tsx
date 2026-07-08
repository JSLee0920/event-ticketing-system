import { REVENUE_BY_EVENT } from './metrics'

export function RevenueByEvent() {
  const max = Math.max(...REVENUE_BY_EVENT.map((r) => r.amount))

  return (
    <div className="rounded-[18px] border border-border bg-card p-5 shadow-card">
      <h3 className="text-[14px] font-bold">Revenue By Event</h3>
      <p className="mt-0.5 text-[12px] text-muted-foreground">
        Gross across all tiers.
      </p>

      <div className="mt-4 flex flex-col gap-3.5">
        {REVENUE_BY_EVENT.map((row) => (
          <div key={row.event}>
            <div className="flex items-center justify-between gap-3 text-[12.5px]">
              <span className="truncate font-semibold">{row.event}</span>
              <span className="flex-none font-bold">
                ${row.amount.toLocaleString()}
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(row.amount / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
