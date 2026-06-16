import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { type ActiveFilters, buildBookingsMadePerDayData } from "@/lib/chart-data"

const TICK_STYLE = { fontSize: 11, fill: "var(--color-muted-foreground)" }

export function BookingsMadePerDayChart({ filters }: { filters: ActiveFilters }) {
  const data = buildBookingsMadePerDayData(filters)

  return (
    <section>
      <h2 className="mb-4 text-xs font-semibold tracking-wide uppercase">
        Bookings made per day
      </h2>
      <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
        <ResponsiveContainer width="100%" height={240}>
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
            <Tooltip
              contentStyle={{
                fontSize: 12,
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
              }}
              formatter={(v) => [(v as number).toLocaleString(), "Bookings"]}
            />
            <Bar dataKey="bookings" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
