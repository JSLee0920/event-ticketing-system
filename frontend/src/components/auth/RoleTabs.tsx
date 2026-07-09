import { useRef } from 'react'
import { cn } from '#/lib/utils'

export type AuthRole = 'customer' | 'organizer' | 'staff'

const ROLES: { value: AuthRole; label: string }[] = [
  { value: 'customer', label: 'Customer' },
  { value: 'organizer', label: 'Organizer' },
  { value: 'staff', label: 'Staff' },
]

// radiogroup so arrow keys move between roles
export function RoleTabs({
  value,
  onChange,
  label,
}: {
  value: AuthRole
  onChange: (role: AuthRole) => void
  label: string
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function move(dir: 1 | -1) {
    const i = ROLES.findIndex((r) => r.value === value)
    const nextIndex = (i + dir + ROLES.length) % ROLES.length
    onChange(ROLES[nextIndex].value)
    refs.current[nextIndex]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="mt-[18px] flex gap-0 rounded-full bg-secondary p-1"
    >
      {ROLES.map((role, index) => {
        const active = role.value === value
        return (
          <button
            key={role.value}
            ref={(el) => {
              refs.current[index] = el
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(role.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault()
                move(1)
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault()
                move(-1)
              }
            }}
            className={cn(
              'flex-1 rounded-full py-2 text-center text-[12.5px] font-bold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
              active
                ? 'bg-card text-foreground shadow-sm'
                : 'text-faint hover:text-foreground',
            )}
          >
            {role.label}
          </button>
        )
      })}
    </div>
  )
}
