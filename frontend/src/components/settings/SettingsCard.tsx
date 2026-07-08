export function SettingsCard({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[18px] border border-border bg-card p-5 shadow-card sm:p-6">
      <h2 className="text-[16px] font-bold tracking-[-0.01em]">{title}</h2>
      {description && (
        <p className="mt-0.5 text-[12.5px] text-muted-foreground">
          {description}
        </p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  )
}

export function SettingRow({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div className="min-w-0">
        <div className="text-[13.5px] font-semibold">{label}</div>
        {description && (
          <div className="mt-0.5 text-[12px] text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      {children}
    </div>
  )
}
