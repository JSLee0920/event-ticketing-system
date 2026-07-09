import { SALES_OVER_TIME } from './metrics'

export function SalesChart() {
  const max = Math.max(...SALES_OVER_TIME.map((p) => p.value))
  const total = SALES_OVER_TIME.reduce((sum, p) => sum + p.value, 0)

  return (
    <div className="rounded-[18px] border border-border bg-card p-5 shadow-card">
      <div className="flex items-baseline justify-between">
        <h3 className="text-[14px] font-bold">Sales Over Time</h3>
        <span className="text-[12px] text-muted-foreground">
          ${total.toLocaleString()} · 14 days
        </span>
      </div>

      <div className="mt-5 flex h-[160px] items-end gap-1.5">
        {SALES_OVER_TIME.map((point) => (
          <div
            key={point.id}
            className="flex flex-1 flex-col items-center gap-1.5"
          >
            <div
              className="w-full rounded-t-[4px] bg-primary/80 transition-colors hover:bg-primary"
              style={{ height: `${(point.value / max) * 100}%` }}
              title={`$${point.value.toLocaleString()}`}
            />
            <span className="text-[10px] text-faint">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
