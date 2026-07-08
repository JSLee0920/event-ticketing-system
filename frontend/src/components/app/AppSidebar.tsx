import { useNavigate } from '@tanstack/react-router'
import {
  Calendar,
  Compass,
  LayoutDashboard,
  LogOut,
  PanelLeft,
  Receipt,
  Settings,
  Ticket,
  Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '#/lib/utils'
import { clearToken } from '#/lib/auth'

export type NavKey =
  | 'discover'
  | 'tickets'
  | 'orders'
  | 'dashboard'
  | 'events'
  | 'payouts'
  | 'settings'

type NavItem = { key: NavKey; label: string; icon: LucideIcon }

const CUSTOMER_NAV: NavItem[] = [
  { key: 'discover', label: 'Discover', icon: Compass },
  { key: 'tickets', label: 'My Tickets', icon: Ticket },
  { key: 'orders', label: 'My Orders', icon: Receipt },
]

const ORGANIZER_NAV: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'events', label: 'Your Events', icon: Calendar },
  { key: 'payouts', label: 'Payouts', icon: Wallet },
]

export function AppSidebar({
  active,
  collapsed,
  onToggle,
}: {
  active: NavKey
  collapsed: boolean
  onToggle: () => void
}) {
  const navigate = useNavigate()

  // Only Discover has a route today; the rest are placeholders until built.
  function go(key: NavKey) {
    if (key === 'discover') navigate({ to: '/' })
  }

  function logOut() {
    clearToken()
    navigate({ to: '/login' })
  }

  return (
    <aside
      className={cn(
        'sticky top-0 flex h-screen flex-none flex-col gap-0.5 overflow-hidden border-r border-border bg-background px-3.5 pb-[18px] pt-3 transition-[width] duration-150',
        collapsed ? 'w-[72px]' : 'w-[236px]',
      )}
    >
      <div
        className={cn(
          'flex items-center px-3 pb-2',
          collapsed ? 'justify-center' : 'justify-between',
        )}
      >
        {!collapsed && (
          <button
            type="button"
            onClick={() => go('discover')}
            className="font-display text-lg font-extrabold tracking-[-0.03em] cursor-pointer"
          >
            odeon<span className="text-primary">*</span>
          </button>
        )}
        <button
          type="button"
          onClick={onToggle}
          title={collapsed ? 'Open sidebar' : 'Close sidebar'}
          className="flex size-8 items-center justify-center rounded-[10px] text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <PanelLeft className="size-[17px]" strokeWidth={2} />
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

      <div
        className={cn(
          'px-3 pb-2 pt-5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-faint',
          collapsed && 'text-center',
        )}
      >
        {collapsed ? '•' : 'Organizer'}
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
          'flex items-center gap-[11px] rounded-xl px-3 py-2 text-[12.5px] font-semibold text-faint hover:bg-secondary hover:text-destructive',
          collapsed && 'justify-center',
        )}
      >
        <LogOut className="size-[15px] flex-none" strokeWidth={2} />
        {!collapsed && <span className="whitespace-nowrap">Log Out</span>}
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
        collapsed && 'justify-center',
        active
          ? 'bg-[color-mix(in_srgb,var(--secondary),#000_8%)] text-foreground'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      )}
    >
      <Icon className="size-[17px] flex-none" strokeWidth={2} />
      {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
    </button>
  )
}
