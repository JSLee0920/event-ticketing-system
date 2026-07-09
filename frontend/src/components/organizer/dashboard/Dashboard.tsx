import { ChevronDown } from 'lucide-react'
import { KPIS } from './metrics'
import { KpiCard } from './KpiCard'
import { SalesChart } from './SalesChart'
import { RevenueByEvent } from './RevenueByEvent'

export function Dashboard() {
  return (
    <div className="px-4 pb-[60px] sm:px-10">
      <div className="flex flex-wrap items-end justify-between gap-3 pt-7 sm:pt-11">
        <div>
          <h2 className="font-display text-[28px] font-semibold leading-[1.06] tracking-[-0.04em]">
            Dashboard
          </h2>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Night Owl Presents · all events
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full border border-dashed border-border px-3.5 py-2 text-[12.5px] font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Last 30 Days
          <ChevronDown className="size-[14px]" strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SalesChart />
        <RevenueByEvent />
      </div>
    </div>
  )
}
