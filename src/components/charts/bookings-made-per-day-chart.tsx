import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { SortedChartTooltip } from "@/components/charts/sorted-chart-tooltip"
import { ReportSection } from "@/components/report-section"
import { type ActiveFilters, buildBookingsMadePerDayData } from "@/lib/chart-data"

const TICK_STYLE = { fontSize: 11, fill: "var(--color-muted-foreground)" }

type BookingsMadePerDayChartProps = {
  filters: ActiveFilters
  compact?: boolean
}

export function BookingsMadePerDayChart({ filters, compact }: BookingsMadePerDayChartProps) {
  const data = buildBookingsMadePerDayData(filters)

  const chart = (
    <div className={compact ? "min-w-0 p-0" : "min-w-0 rounded-xl border border-border bg-card p-4 shadow-xs"}>
      <ResponsiveContainer width="100%" height={compact ? 260 : 240}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barSize={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={TICK_STYLE}
            interval={13}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={TICK_STYLE}
            tickLine={false}
            axisLine={false}
            width={52}
            tickFormatter={(v) => (v as number).toLocaleString()}
          />
          <Tooltip content={<SortedChartTooltip />} />
          <Bar dataKey="bookings" fill="#3b82f6" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

  if (compact) {
    return <section>{chart}</section>
  }

  return (
    <ReportSection
      title="Bookings made per day"
      exportSlug="bookings-per-day"
      filters={filters}
      headingClassName="mb-4"
    >
      {chart}
    </ReportSection>
  )
}
