import { ProfileCard } from './ProfileCard'
import { NotificationsCard } from './NotificationsCard'
import { AppearanceCard } from './AppearanceCard'

export function Settings() {
  return (
    <div className="px-4 pb-[60px] sm:px-10">
      <div className="mx-auto max-w-[560px]">
        <h2 className="pt-7 font-display text-[28px] font-semibold leading-[1.06] tracking-[-0.04em] sm:pt-11">
          Settings
        </h2>

        <div className="mt-6 flex flex-col gap-4">
          <ProfileCard />
          <NotificationsCard />
          <AppearanceCard />
        </div>
      </div>
    </div>
  )
}
