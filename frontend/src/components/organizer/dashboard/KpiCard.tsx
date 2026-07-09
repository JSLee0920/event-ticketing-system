import { cn } from '#/lib/utils'
import type { Kpi } from './metrics'

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const Icon = kpi.icon

  return (
    <div
      className={cn(
        'relative rounded-[18px] border p-5 shadow-card',
        kpi.cardClass,
      )}
    >
      <span
        className={cn(
          'absolute right-4 top-4 flex size-[30px] items-center justify-center rounded-full',
          kpi.iconClass,
        )}
      >
        <Icon className="size-[15px]" strokeWidth={2.2} />
      </span>

      <div className="text-[12px] font-semibold text-muted-foreground">
        {kpi.label}
      </div>
      <div className="mt-2 font-display text-[26px] font-extrabold tracking-[-0.02em]">
        {kpi.value}
      </div>
      {kpi.delta && (
        <div className="mt-1 text-[12px] font-bold text-ok">
          {kpi.delta} vs last period
        </div>
      )}
    </div>
  )
}
