import { cn } from '#/lib/utils'

export function OdeonWordmark({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'text-center font-display text-xl font-extrabold tracking-[-0.03em]',
        className,
      )}
    >
      odeon<span className="text-primary">*</span>
    </div>
  )
}
