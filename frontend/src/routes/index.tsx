import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/AppLayout'
import { Discover } from '#/components/discover/Discover'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <AppLayout active="discover" title="Discover">
      <Discover />
    </AppLayout>
  )
}
