import { PAYOUT_BALANCE, PAYOUT_HISTORY } from './payouts-data'

export function Payouts() {
  return (
    <div className="px-4 pb-[60px] sm:px-10">
      <div className="pt-7 sm:pt-11">
        <h2 className="font-display text-[28px] font-semibold leading-[1.06] tracking-[-0.04em]">
          Payouts
        </h2>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Payouts run every Monday.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[18px] border border-border bg-card p-6 shadow-card">
        <div>
          <div className="text-[12.5px] font-semibold text-muted-foreground">
            Available Balance
          </div>
          <div className="mt-1 font-display text-[32px] font-extrabold leading-none tracking-[-0.03em]">
            ${PAYOUT_BALANCE.available.toLocaleString()}
          </div>
          <div className="mt-2 text-[12.5px] text-muted-foreground">
            Next payout {PAYOUT_BALANCE.nextDate} · {PAYOUT_BALANCE.account}
          </div>
        </div>
        <button
          type="button"
          className="rounded-full bg-primary px-[26px] py-3 text-[13.5px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Withdraw
        </button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-[18px] border border-border bg-card shadow-card">
        <div className="min-w-[480px]">
          <div className="grid grid-cols-[1.2fr_1.6fr_1fr_0.9fr] gap-2 border-b border-border px-5 py-3 text-[11px] font-bold uppercase tracking-[0.06em] text-faint">
            <span>Date</span>
            <span>Account</span>
            <span>Amount</span>
            <span className="text-right">Status</span>
          </div>
          {PAYOUT_HISTORY.map((payout) => (
            <div
              key={payout.id}
              className="grid grid-cols-[1.2fr_1.6fr_1fr_0.9fr] items-center gap-2 border-b border-border px-5 py-3.5 text-[13px] last:border-b-0"
            >
              <span className="font-semibold">{payout.date}</span>
              <span className="text-muted-foreground">{payout.account}</span>
              <span className="font-display font-bold">
                ${payout.amount.toLocaleString()}
              </span>
              <span className="text-right">
                <span className="rounded-full bg-ok-bg px-2.5 py-1 text-[11px] font-bold text-ok">
                  {payout.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
