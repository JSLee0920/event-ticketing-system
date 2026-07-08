import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { Dashboard } from '#/components/organizer/Dashboard'

export const Route = createFileRoute('/dashboard')({ component: DashboardPage })

function DashboardPage() {
  return (
    <AppLayout active="dashboard" title="Dashboard">
      <Dashboard />
    </AppLayout>
  )
}
