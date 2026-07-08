import { useState } from 'react'
import type { ReactNode } from 'react'
import { AppSidebar } from './AppSidebar'
import type { NavKey } from './AppSidebar'
import { AppTopbar } from './AppTopbar'

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

  return (
    <div className="flex items-stretch bg-background">
      <AppSidebar
        active={active}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />
      <div className="min-h-screen min-w-0 flex-1 bg-surface">
        <AppTopbar title={title} />
        {children}
      </div>
    </div>
  )
}
