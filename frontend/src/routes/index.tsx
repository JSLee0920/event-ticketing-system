import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '#/components/app/app-layout'
import { Discover } from '#/components/discover/discover'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <AppLayout active="discover" title="Discover">
      <Discover />
    </AppLayout>
  )
}
