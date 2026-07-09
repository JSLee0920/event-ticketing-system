import type { ReactNode } from 'react'
import { OdeonWordmark } from './OdeonWordmark'
import { AuthWallpaper } from './AuthWallpaper'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen bg-background">
      <div className="relative flex flex-1 flex-col px-6 py-7 sm:px-10">
        <OdeonWordmark />
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[380px] pb-10">{children}</div>
        </div>
      </div>

      <div className="hidden p-3 lg:block lg:w-1/2">
        <AuthWallpaper className="h-full w-full" />
      </div>
    </main>
  )
}
