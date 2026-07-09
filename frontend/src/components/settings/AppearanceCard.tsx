import { Moon, Sun } from 'lucide-react'
import { useTheme } from '#/lib/theme'
import { Switch } from '#/components/ui/switch'
import { SettingsCard, SettingRow } from './SettingsCard'

export function AppearanceCard() {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'

  return (
    <SettingsCard title="Appearance" description="Switch between light and dark.">
      <SettingRow
        label="Dark Mode"
        description={dark ? 'Dark theme is on.' : 'Light theme is on.'}
      >
        <div className="flex items-center gap-2.5">
          {dark ? (
            <Moon className="size-4 text-muted-foreground" strokeWidth={2} />
          ) : (
            <Sun className="size-4 text-muted-foreground" strokeWidth={2} />
          )}
          <Switch checked={dark} onCheckedChange={toggle} />
        </div>
      </SettingRow>
    </SettingsCard>
  )
}
