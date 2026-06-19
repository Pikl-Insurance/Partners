import type { LegendPayload } from "recharts"

import { cn } from "@/lib/utils"

export type InteractiveChartLegendProps = {
  payload?: readonly LegendPayload[]
  hiddenKeys: Set<string>
  onToggleSeries: (dataKey: string) => void
}

export function InteractiveChartLegend({
  payload,
  hiddenKeys,
  onToggleSeries,
}: InteractiveChartLegendProps) {
  if (!payload?.length) {
    return null
  }

  return (
    <ul className="recharts-default-legend flex flex-wrap justify-center gap-x-4 gap-y-1 pt-3">
      {payload.map((entry) => {
        const rawKey = entry.dataKey
        const dataKey =
          typeof rawKey === "string" || typeof rawKey === "number"
            ? String(rawKey)
            : String(entry.value)
        const isHidden = hiddenKeys.has(dataKey)
        const color = entry.color ?? "var(--color-muted-foreground)"

        return (
          <li key={dataKey} className="recharts-legend-item inline-flex!">
            <button
              type="button"
              onClick={() => onToggleSeries(dataKey)}
              className={cn(
                "inline-flex items-center gap-1.5 text-[11px] font-medium transition-opacity hover:opacity-80",
                isHidden && "opacity-40"
              )}
              style={{ color: isHidden ? "var(--color-muted-foreground)" : color }}
              aria-pressed={!isHidden}
            >
              <span
                aria-hidden
                className="inline-block h-0.5 w-4 shrink-0 rounded-full"
                style={{
                  backgroundColor: color,
                  opacity: isHidden ? 0.35 : 1,
                }}
              />
              <span className="recharts-legend-item-text">{entry.value}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
