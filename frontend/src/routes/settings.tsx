import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { Settings } from '#/components/settings/Settings'

export const Route = createFileRoute('/settings')({ component: SettingsPage })

function SettingsPage() {
  return (
    <AppLayout active="settings" title="Settings">
      <Settings />
    </AppLayout>
  )
}
