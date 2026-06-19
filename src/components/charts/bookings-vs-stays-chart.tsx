import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { InteractiveChartLegend } from "@/components/charts/interactive-chart-legend"
import { SortedChartTooltip } from "@/components/charts/sorted-chart-tooltip"
import { useHiddenChartSeries } from "@/components/charts/use-hidden-chart-series"
import { ReportSection } from "@/components/report-section"
import { type ActiveFilters, buildDailyBookingsData } from "@/lib/chart-data"

const SERIES = [
  { key: "made", label: "Made", color: "#3b82f6" },
  { key: "starting", label: "Starting", color: "#a855f7" },
]

const SERIES_KEYS = SERIES.map(({ key }) => key)

const TICK_STYLE = { fontSize: 11, fill: "var(--color-muted-foreground)" }
const EVERY_NTH = 13

type BookingsVsStaysChartProps = {
  filters: ActiveFilters
  compact?: boolean
}

export function BookingsVsStaysChart({ filters, compact }: BookingsVsStaysChartProps) {
  const data = buildDailyBookingsData(filters)
  const { hiddenKeys, toggleSeries, isHidden } = useHiddenChartSeries(SERIES_KEYS)

  const chart = (
    <div className={compact ? "min-w-0 p-0" : "min-w-0 rounded-xl border border-border bg-card p-4 shadow-xs"}>
      <ResponsiveContainer width="100%" height={compact ? 280 : 260}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="date"
            tick={TICK_STYLE}
            interval={EVERY_NTH}
            tickLine={false}
            axisLine={false}
          />
          <YAxis tick={TICK_STYLE} tickLine={false} axisLine={false} width={48} />
          <Tooltip content={<SortedChartTooltip />} />
          <Legend
            content={(props) => (
              <InteractiveChartLegend
                payload={props.payload}
                hiddenKeys={hiddenKeys}
                onToggleSeries={toggleSeries}
              />
            )}
          />
          {SERIES.map(({ key, label, color }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={label}
              hide={isHidden(key)}
              stroke={color}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )

  if (compact) {
    return <section>{chart}</section>
  }

  return (
    <ReportSection
      title="Bookings made vs stays starting per day"
      exportSlug="bookings-vs-stays"
      filters={filters}
      headingClassName="mb-4"
    >
      {chart}
    </ReportSection>
  )
}
