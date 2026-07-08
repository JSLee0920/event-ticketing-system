import { useState } from 'react'
import { Switch } from '#/components/ui/switch'
import { SettingsCard, SettingRow } from './SettingsCard'

const OPTIONS = [
  {
    key: 'receipts',
    label: 'Email Receipts',
    description: 'Order confirmations and refund updates.',
    default: true,
  },
  {
    key: 'reminders',
    label: 'Event Reminders',
    description: 'A nudge the day before your events.',
    default: true,
  },
  {
    key: 'sms',
    label: 'SMS Alerts',
    description: 'Time-sensitive updates by text.',
    default: false,
  },
] as const

export function NotificationsCard() {
  const [state, setState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(OPTIONS.map((o) => [o.key, o.default])),
  )

  return (
    <SettingsCard
      title="Notifications"
      description="Choose how we keep you posted."
    >
      <div className="divide-y divide-border">
        {OPTIONS.map((o) => (
          <SettingRow key={o.key} label={o.label} description={o.description}>
            <Switch
              checked={state[o.key]}
              onCheckedChange={(v) =>
                setState((prev) => ({ ...prev, [o.key]: v }))
              }
            />
          </SettingRow>
        ))}
      </div>
    </SettingsCard>
  )
}
