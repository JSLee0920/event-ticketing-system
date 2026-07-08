import { cn } from '#/lib/utils'

export function AuthWallpaper({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[18px] border border-border bg-cover bg-center',
        className,
      )}
      aria-hidden="true"
      style={{ backgroundImage: "url('/event_wallpaper.jpg')" }}
    >
      {/* scrim: keeps the tagline legible over any photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,18,25,0.15) 0%, rgba(0,18,25,0.55) 78%, rgba(0,18,25,0.72) 100%)',
        }}
      />

      <div className="relative flex h-full flex-col justify-between p-9 text-white">
        <div className="font-display text-lg font-extrabold tracking-[-0.03em]">
          odeon<span className="text-white/70">*</span>
        </div>

        <div className="max-w-[320px]">
          <p className="font-display text-[30px] font-semibold leading-[1.15] tracking-[-0.03em]">
            Your next night out, all in one place.
          </p>
          <p className="mt-3 text-sm text-white/85">
            Discover events, grab tickets in seconds, and keep every one of them
            in your pocket.
          </p>
        </div>
      </div>
    </div>
  )
}
