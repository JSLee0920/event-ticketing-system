import { useEffect, useRef, useState } from 'react'
import { Bell, Calendar, Check, DollarSign, Moon, Sun } from 'lucide-react'
import { cn } from '#/lib/utils'
import { useTheme } from '#/lib/theme'

type Notification = {
  icon: 'ok' | 'event' | 'warn' | 'money'
  text: string
  time: string
}

const NOTIFICATIONS: Notification[] = [
  {
    icon: 'ok',
    text: 'Order ORD-1043 confirmed — 2 tickets issued',
    time: '2 hours ago',
  },
  {
    icon: 'event',
    text: 'Midnight Frequencies Tour is tomorrow at 8:00 PM',
    time: '5 hours ago',
  },
  {
    icon: 'warn',
    text: 'Harbor Jazz Nights: only 8 table seats left',
    time: 'Yesterday',
  },
  {
    icon: 'money',
    text: 'Payout of $4,200 sent to •••• 6621',
    time: '2 days ago',
  },
]

export function AppTopbar({ title }: { title: string }) {
  const { theme, toggle } = useTheme()
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!notifOpen) return
    function onClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [notifOpen])

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-surface px-6 py-2.5">
      <h1 className="font-display text-lg font-semibold tracking-[-0.02em]">
        {title}
      </h1>

      <div className="flex items-center gap-2.5">
        <div ref={notifRef} className="relative">
          <button
            type="button"
            title="Notifications"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <Bell className="size-[17px]" strokeWidth={2} />
            <span className="absolute right-2 top-[7px] size-[7px] rounded-full border-2 border-surface bg-destructive" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 z-[200] w-[330px] overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_12px_32px_rgba(0,18,25,0.14)]">
              <div className="flex items-center justify-between border-b border-border px-[18px] py-3.5">
                <span className="text-[13.5px] font-bold">Notifications</span>
                <button
                  type="button"
                  className="text-[11.5px] font-semibold text-primary"
                >
                  Mark all read
                </button>
              </div>
              {NOTIFICATIONS.map((n, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex gap-3 px-[18px] py-3.5 hover:bg-secondary',
                    i < NOTIFICATIONS.length - 1 && 'border-b border-border',
                  )}
                >
                  <NotifIcon icon={n.icon} />
                  <div>
                    <div className="text-[12.5px] font-semibold leading-snug">
                      {n.text}
                    </div>
                    <div className="mt-0.5 text-[11px] text-faint">
                      {n.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          onClick={toggle}
          className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          {theme === 'dark' ? (
            <Sun className="size-[17px]" strokeWidth={2} />
          ) : (
            <Moon className="size-[17px]" strokeWidth={2} />
          )}
        </button>

        <button
          type="button"
          title="Profile"
          className="flex size-8 flex-none items-center justify-center rounded-full bg-[linear-gradient(135deg,#EE9B00,#AE2012)] text-[11px] font-bold text-white"
        >
          JT
        </button>
      </div>
    </header>
  )
}

function NotifIcon({ icon }: { icon: Notification['icon'] }) {
  const base =
    'flex size-[30px] flex-none items-center justify-center rounded-full'
  if (icon === 'ok')
    return (
      <div className={cn(base, 'bg-ok-bg text-ok')}>
        <Check className="size-[15px]" strokeWidth={2.5} />
      </div>
    )
  if (icon === 'event')
    return (
      <div className={cn(base, 'bg-acc-soft text-primary')}>
        <Calendar className="size-[14px]" strokeWidth={2} />
      </div>
    )
  if (icon === 'warn')
    return (
      <div
        className={cn(base, 'bg-warn-bg text-warn text-[13px] font-extrabold')}
      >
        !
      </div>
    )
  return (
    <div className={cn(base, 'bg-info-bg text-info')}>
      <DollarSign className="size-[14px]" strokeWidth={2.5} />
    </div>
  )
}
