import type { ReactNode } from 'react'
import { OdeonWordmark } from './odeon-wordmark'
import { AuthWallpaper } from './auth-wallpaper'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 sm:p-10">
      <div className="flex w-full max-w-[880px] items-stretch justify-center gap-6">
        <div className="w-full max-w-[400px] self-center rounded-[18px] border border-border bg-card p-7 shadow-sm sm:p-9">
          <OdeonWordmark />
          {children}
        </div>
        <AuthWallpaper className="hidden flex-1 lg:block" />
      </div>
    </main>
  )
}
