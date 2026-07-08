import { cn } from '#/lib/utils'

export function OdeonWordmark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'font-display text-3xl font-extrabold tracking-[-0.03em]',
        className,
      )}
    >
      odeon<span className="text-primary">*</span>
    </div>
  )
}
