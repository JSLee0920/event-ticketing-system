import { useState } from 'react'
import { Check } from 'lucide-react'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Button } from '#/components/ui/button'
import { SettingsCard } from './SettingsCard'

export function ProfileCard() {
  const [name, setName] = useState('Jordan Tan')
  const [email, setEmail] = useState('jordan@example.com')
  const [saved, setSaved] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Placeholder — wire to PUT /api/auth/me once the endpoint exists.
    setSaved(true)
  }

  return (
    <SettingsCard
      title="Profile"
      description="Update your name and contact email."
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <Field id="name" label="Name">
          <Input
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setSaved(false)
            }}
            className="h-auto rounded-xl border-[1.5px] px-4 py-3 text-sm"
          />
        </Field>
        <Field id="email" label="Email">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setSaved(false)
            }}
            className="h-auto rounded-xl border-[1.5px] px-4 py-3 text-sm"
          />
        </Field>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button
            type="submit"
            className="h-auto rounded-full px-5 py-2.5 text-[13px] font-bold"
          >
            Save Changes
          </Button>
          {saved && (
            <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ok">
              <Check className="size-[15px]" strokeWidth={2.5} />
              Saved
            </span>
          )}
        </div>
      </form>
    </SettingsCard>
  )
}

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label
        htmlFor={id}
        className="text-[12.5px] font-semibold text-muted-foreground"
      >
        {label}
      </Label>
      {children}
    </div>
  )
}
