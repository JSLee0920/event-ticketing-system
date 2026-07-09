import { useState } from 'react'
import type { ReactNode } from 'react'
import { AppSidebar } from './AppSidebar'
import type { NavKey } from './AppSidebar'
import { AppTopbar } from './AppTopbar'
import { getRole } from '#/lib/auth'

export function AppLayout({
  active,
  title,
  children,
}: {
  active: NavKey
  title: string
  children: ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const role = getRole()

  return (
    <div className="flex items-stretch bg-background">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[90] bg-black/40 lg:hidden"
        />
      )}
      <AppSidebar
        active={active}
        role={role}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="min-h-screen min-w-0 flex-1 bg-surface">
        <AppTopbar title={title} onMenu={() => setMobileOpen(true)} />
        {children}
      </div>
    </div>
  )
}
