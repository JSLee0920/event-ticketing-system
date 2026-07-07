import type { ReactNode } from 'react'
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
      <h1 className="mt-[18px] text-center font-display text-[22px] font-semibold tracking-[-0.02em]">
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
  className,
  ...props
}: React.ComponentProps<typeof Input> & { id: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-[12.5px] font-semibold text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        className="h-auto rounded-xl border-[1.5px] px-4 py-3 text-sm"
        {...props}
      />
    </div>
  )
}

export function AuthSubmit({ children }: { children: ReactNode }) {
  return (
    <Button
      type="submit"
      className="mt-1.5 h-auto w-full rounded-full py-3.5 text-sm font-bold"
    >
      {children}
    </Button>
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
