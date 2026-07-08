import type { ReactNode } from 'react'
import { cn } from '#/lib/utils'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Button } from '#/components/ui/button'

export function AuthHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <>
      <h1 className="mt-1 text-center font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.02em]">
        {title}
      </h1>
      {subtitle !== undefined && (
        <p className="mt-3 min-h-[18px] text-center text-[13px] leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </>
  )
}

export function AuthField({
  id,
  label,
  error,
  className,
  ...props
}: React.ComponentProps<typeof Input> & {
  id: string
  label: string
  error?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={id}
        className="text-[12.5px] font-semibold text-muted-foreground"
      >
        {label}
      </Label>
      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn('h-auto rounded-xl border-[1.5px] px-4 py-3 text-sm', className)}
        {...props}
      />
      {error && (
        <p className="text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  )
}

export function AuthSubmit({
  children,
  disabled,
}: {
  children: ReactNode
  disabled?: boolean
}) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className="mt-1.5 h-auto w-full rounded-full py-3.5 text-sm font-bold"
    >
      {children}
    </Button>
  )
}

export function AuthAlert({
  children,
  tone = 'error',
}: {
  children: ReactNode
  tone?: 'error' | 'success'
}) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'rounded-xl px-4 py-3 text-[13px] font-medium',
        tone === 'error' ? 'bg-err-bg text-destructive' : 'bg-ok-bg text-ok',
      )}
    >
      {children}
    </div>
  )
}

export function OrDivider() {
  return (
    <div className="my-0.5 flex items-center gap-3">
      <div className="flex-1 border-t border-border" />
      <span className="text-[11.5px] font-semibold text-faint">or</span>
      <div className="flex-1 border-t border-border" />
    </div>
  )
}

// Field errors come from zod (issue objects) or plain function validators
// (strings); pull the first human-readable message out of either.
export function firstError(errors: unknown[]): string | undefined {
  for (const e of errors) {
    if (typeof e === 'string') return e
    if (e && typeof e === 'object' && 'message' in e) {
      const message = (e as { message?: unknown }).message
      if (typeof message === 'string') return message
    }
  }
  return undefined
}
