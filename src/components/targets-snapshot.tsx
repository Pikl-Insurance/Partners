import { useId } from "react"
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis } from "recharts"

import {
  getOverallTargetAchievement,
  getTargetAchievementPercent,
  LANDING_TARGET_PROGRESS_CHART,
  LANDING_TARGETS,
  formatTargetGoal,
  formatTargetValue,
  type LandingTarget,
} from "@/lib/landing-targets-data"
import { FIGURE_24PX_CLASS } from "@/lib/figure-styles"
import { cn } from "@/lib/utils"

const TICK_STYLE = { fontSize: 11, fill: "var(--color-muted-foreground)" }

function TargetDonut({ percent }: { percent: number }) {
  const achieved = Math.min(100, Math.max(0, percent))
  const data = [
    { name: "Achieved", value: achieved },
    { name: "Remaining", value: 100 - achieved },
  ]

  return (
    <div className="relative mx-auto size-36">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="72%"
            outerRadius="92%"
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill="var(--foreground)" />
            <Cell fill="var(--muted)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className={cn("font-bold tabular-nums text-foreground", FIGURE_24PX_CLASS)}>
          {achieved}%
        </p>
        <p className="text-[11px] text-muted-foreground">achieved</p>
      </div>
    </div>
  )
}

function TargetBreakdownRow({ target }: { target: LandingTarget }) {
  const percent = getTargetAchievementPercent(target.actual, target.target)

  return (
    <li className="py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{target.label}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatTargetValue(target)} of {formatTargetGoal(target)}
          </p>
        </div>
        <span className="shrink-0 text-xs font-semibold tabular-nums text-foreground">
          {percent}%
        </span>
      </div>
      <div
        className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted"
        role="presentation"
      >
        <div
          className="h-full rounded-full bg-foreground transition-[width]"
          style={{ width: `${percent}%` }}
        />
      </div>
    </li>
  )
}

export function TargetsSnapshot() {
  const gradientId = `target-progress-fill-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  const overallPercent = getOverallTargetAchievement(LANDING_TARGETS)

  return (
    <div className="grid min-h-0 flex-1 gap-4 @md:grid-cols-2">
      <div className="flex min-h-0 flex-col rounded-xl border border-border bg-card shadow-xs">
        <div className="shrink-0 border-b border-border px-4 py-2.5">
          <p className="text-xs font-semibold text-foreground">Overall progress</p>
          <p className="text-[11px] text-muted-foreground">YTD achievement across all targets</p>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3 p-4">
          <TargetDonut percent={overallPercent} />
          <div className="h-20 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={LANDING_TARGET_PROGRESS_CHART}
                margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--foreground)" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="var(--foreground)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={TICK_STYLE}
                  interval={0}
                  dy={4}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--foreground)"
                  strokeWidth={1.5}
                  strokeOpacity={0.55}
                  fill={`url(#${gradientId})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-[11px] text-muted-foreground">
            Cumulative achievement by month
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <div className="shrink-0 border-b border-border px-4 py-2.5">
          <p className="text-xs font-semibold text-foreground">Target breakdown</p>
          <p className="text-[11px] text-muted-foreground">Actual vs goal by metric</p>
        </div>
        <ul className="divide-y divide-border px-4">
          {LANDING_TARGETS.map((target) => (
            <TargetBreakdownRow key={target.id} target={target} />
          ))}
        </ul>
      </div>
    </div>
  )
}
