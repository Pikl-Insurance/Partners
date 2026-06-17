type TooltipEntry = {
  color?: string
  dataKey?: string | number
  name?: string
  value?: number | string
}

type SortedChartTooltipProps = {
  active?: boolean
  payload?: TooltipEntry[]
  label?: string | number
  valueFormatter?: (value: number) => string
}

export function SortedChartTooltip({
  active,
  payload,
  label,
  valueFormatter = (value) => value.toLocaleString(),
}: SortedChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  const items = [...payload]
    .filter((entry) => entry.value != null && entry.value !== "")
    .sort((a, b) => Number(b.value) - Number(a.value))

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-md">
      {label != null && label !== "" && (
        <p className="mb-1.5 font-medium text-foreground">{label}</p>
      )}
      <ul className="space-y-1">
        {items.map((entry) => (
          <li
            key={String(entry.dataKey ?? entry.name)}
            className="flex items-center gap-2"
          >
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto font-medium tabular-nums text-foreground">
              {valueFormatter(Number(entry.value))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
