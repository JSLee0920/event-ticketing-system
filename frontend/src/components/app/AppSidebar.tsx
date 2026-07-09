import { useNavigate } from '@tanstack/react-router'
import {
  Calendar,
  CalendarSearch,
  Compass,
  LayoutDashboard,
  LogOut,
  PanelLeft,
  Receipt,
  Settings,
  Ticket,
  Wallet,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '#/lib/utils'
import { clearToken } from '#/lib/auth'
import type { UserRole } from '#/lib/auth'

export type NavKey =
  | 'discover'
  | 'browse'
  | 'tickets'
  | 'orders'
  | 'dashboard'
  | 'events'
  | 'payouts'
  | 'settings'

type NavItem = { key: NavKey; label: string; icon: LucideIcon }

const CUSTOMER_NAV: NavItem[] = [
  { key: 'discover', label: 'Discover', icon: Compass },
  { key: 'browse', label: 'Events', icon: CalendarSearch },
  { key: 'tickets', label: 'My Tickets', icon: Ticket },
  { key: 'orders', label: 'My Orders', icon: Receipt },
]

const ORGANIZER_NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'events', label: 'Your Events', icon: Calendar },
  { key: 'payouts', label: 'Payouts', icon: Wallet },
]

// NavKey → route path. Keys absent here have no route built yet (no-op on click).
const NAV_ROUTES = {
  discover: '/',
  browse: '/events',
  tickets: '/tickets',
  orders: '/orders',
  dashboard: '/dashboard',
  events: '/organizer/events',
  payouts: '/organizer/payouts',
  settings: '/settings',
} as const satisfies Partial<Record<NavKey, string>>

export function AppSidebar({
  active,
  role,
  collapsed,
  onToggle,
  mobileOpen,
  onCloseMobile,
}: {
  active: NavKey
  role: UserRole | null
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}) {
  const navigate = useNavigate()
  const canOrganize = role === 'ORGANIZER' || role === 'STAFF'

  function go(key: NavKey) {
    const to = NAV_ROUTES[key as keyof typeof NAV_ROUTES]
    if (to) navigate({ to })
    onCloseMobile()
  }

  function logOut() {
    clearToken()
    navigate({ to: '/login' })
    onCloseMobile()
  }

  return (
    <aside
      className={cn(
        // Mobile: fixed off-canvas drawer. lg: static sticky rail.
        'fixed inset-y-0 left-0 z-100 flex h-screen w-59 flex-none flex-col gap-0.5 overflow-hidden border-r border-border bg-background px-3.5 pb-4.5 pt-3 transition-transform duration-200 lg:sticky lg:top-0 lg:z-auto lg:translate-x-0 lg:transition-[width]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
        collapsed ? 'lg:w-18' : 'lg:w-59',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between px-3 pb-2',
          collapsed && 'lg:justify-center',
        )}
      >
        <button
          type="button"
          onClick={() => go('discover')}
          className={cn(
            'font-display text-lg font-extrabold tracking-[-0.03em] cursor-pointer',
            collapsed && 'lg:hidden',
          )}
        >
          odeon<span className="text-primary">*</span>
        </button>
        {/* Desktop: collapse toggle. Mobile: close drawer. */}
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? 'Open sidebar' : 'Close sidebar'}
          title={collapsed ? 'Open sidebar' : 'Close sidebar'}
          className="hidden size-8 items-center justify-center rounded-[10px] text-muted-foreground hover:bg-secondary hover:text-foreground lg:flex"
        >
          <PanelLeft className="size-4.25" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close menu"
          title="Close menu"
          className="flex size-8 items-center justify-center rounded-[10px] text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden"
        >
          <X className="size-4.5" strokeWidth={2} />
        </button>
      </div>

      {CUSTOMER_NAV.map((item) => (
        <SidebarLink
          key={item.key}
          item={item}
          active={active === item.key}
          collapsed={collapsed}
          onClick={() => go(item.key)}
        />
      ))}

      {canOrganize && (
        <>
          <div
            className={cn(
              'px-3 pb-2 pt-5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-faint',
              collapsed && 'lg:text-center',
            )}
          >
            <span className={cn(collapsed && 'lg:hidden')}>Organizer</span>
            {collapsed && <span className="hidden lg:inline">•</span>}
          </div>

          {ORGANIZER_NAV.map((item) => (
            <SidebarLink
              key={item.key}
              item={item}
              active={active === item.key}
              collapsed={collapsed}
              onClick={() => go(item.key)}
            />
          ))}
        </>
      )}

      <div className="flex-1" />

      <SidebarLink
        item={{ key: 'settings', label: 'Settings', icon: Settings }}
        active={active === 'settings'}
        collapsed={collapsed}
        onClick={() => go('settings')}
      />
      <button
        type="button"
        onClick={logOut}
        className={cn(
          'flex items-center gap-[11px] rounded-xl px-3 py-2.5 text-sm font-semibold text-faint hover:bg-secondary hover:text-destructive',
          collapsed && 'lg:justify-center',
        )}
      >
        <LogOut className="size-[17px] flex-none" strokeWidth={2} />
        <span
          className={cn(
            'whitespace-nowrap leading-none',
            collapsed && 'lg:hidden',
          )}
        >
          Log Out
        </span>
      </button>
    </aside>
  )
}

function SidebarLink({
  item,
  active,
  collapsed,
  onClick,
}: {
  item: NavItem
  active: boolean
  collapsed: boolean
  onClick: () => void
}) {
  const Icon = item.icon
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-[11px] rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
        collapsed && 'lg:justify-center',
        active
          ? 'bg-[color-mix(in_srgb,var(--secondary),#000_8%)] text-foreground'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      )}
    >
      <Icon className="size-[17px] flex-none" strokeWidth={2} />
      <span
        className={cn(
          'whitespace-nowrap leading-none',
          collapsed && 'lg:hidden',
        )}
      >
        {item.label}
      </span>
    </button>
  )
}
