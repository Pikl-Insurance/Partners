import { Calendar, TrendingDown, TrendingUp, Users, type LucideIcon } from "lucide-react"
import { useId } from "react"
import { Area, AreaChart, ResponsiveContainer, XAxis } from "recharts"

import {
  InsightCardBody,
  InsightFooter,
  InsightMetricGroup,
  InsightVisualGroup,
  insightCardHeaderClass,
  insightChartHeightClass,
} from "@/components/booking-engine/property-insight-primitives"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { WidgetHelpButton } from "@/components/widgets/widget-help-button"
import { FIGURE_24PX_CLASS, METRIC_WIDGET_STACK_GAP_CLASS } from "@/lib/figure-styles"
import { cn } from "@/lib/utils"

export type MetricTrendDirection = "up" | "down" | "neutral"

export type MetricTrendPoint = {
  label: string
  value: number
}

export type MetricTrendWidgetProps = {
  title: string
  icon?: LucideIcon
  value: string
  trendLabel: string
  trend?: MetricTrendDirection
  comparisonLabel: string
  chartData: MetricTrendPoint[]
  scopeLabel: string
  rateLabel: string
  helpText?: string
  className?: string
  insightLayout?: boolean
  showFooter?: boolean
  compact?: boolean
}

const TICK_STYLE = { fontSize: 11, fill: "var(--color-muted-foreground)" }

function TrendBadge({
  label,
  trend = "neutral",
}: {
  label: string
  trend?: MetricTrendDirection
}) {
  const Icon = trend === "down" ? TrendingDown : TrendingUp

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground tabular-nums">
      {trend !== "neutral" ? <Icon className="size-3 shrink-0" strokeWidth={2.25} /> : null}
      {label}
    </span>
  )
}

export function MetricTrendWidget({
  title,
  icon: Icon,
  value,
  trendLabel,
  trend = "up",
  comparisonLabel,
  chartData,
  scopeLabel,
  rateLabel,
  helpText,
  className,
  insightLayout = false,
  showFooter = true,
  compact = false,
}: MetricTrendWidgetProps) {
  const gradientId = `metric-trend-fill-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`

  if (insightLayout) {
    return (
      <Card
        className={cn(
          "@container flex min-w-0 flex-col bg-card shadow-xs",
          compact ? "h-full rounded-2xl border border-border/70" : "h-full",
          className
        )}
      >
        <CardHeader className={cn(insightCardHeaderClass, compact && "px-5 pt-5")}>
          <div className="flex w-full items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              {Icon ? (
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
                  <Icon className="size-4" />
                </span>
              ) : null}
              <h3 className="min-w-0 flex-1 text-sm font-semibold text-foreground">{title}</h3>
            </div>
            {compact ? null : <WidgetHelpButton title={title} helpText={helpText} />}
          </div>
        </CardHeader>

        <CardContent className={cn("flex flex-col p-0", compact ? "flex-1" : "min-h-0 flex-1")}>
          <InsightCardBody className={compact ? "flex flex-1 flex-col gap-3 px-5 pb-5 pt-0" : undefined}>
            <InsightMetricGroup>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <p
                  className={cn(
                    "font-bold tracking-tight tabular-nums text-foreground",
                    compact ? "text-[26px]" : FIGURE_24PX_CLASS
                  )}
                >
                  {value}
                </p>
                <TrendBadge label={trendLabel} trend={trend} />
              </div>
              <p className="text-xs text-muted-foreground">{comparisonLabel}</p>
            </InsightMetricGroup>

            <InsightVisualGroup className={compact ? "mt-auto gap-0 pt-2" : undefined}>
              <div className={compact ? "h-16 w-full" : insightChartHeightClass}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--foreground)" stopOpacity={0.1} />
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
                      strokeWidth={1.75}
                      strokeOpacity={0.55}
                      fill={`url(#${gradientId})`}
                      dot={false}
                      activeDot={false}
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </InsightVisualGroup>

            {showFooter ? (
              <InsightFooter
                left={
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Users className="size-3.5 shrink-0" strokeWidth={2} />
                    <span className="truncate">{scopeLabel}</span>
                  </div>
                }
                right={
                  <div className="flex items-center gap-1.5 text-[10px] tabular-nums text-muted-foreground">
                    <Calendar className="size-3.5 shrink-0" strokeWidth={2} />
                    {rateLabel}
                  </div>
                }
              />
            ) : null}
          </InsightCardBody>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("@container flex h-full min-w-0 flex-col bg-card shadow-xs", className)}>
      <CardHeader className="flex-row items-start justify-between space-y-0 px-4 pb-2 pt-4">
        <div className="flex min-w-0 items-center gap-2.5 pr-2">
          {Icon ? (
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-muted text-foreground">
              <Icon className="size-4" />
            </span>
          ) : null}
          <h3 className="min-w-0 text-sm font-semibold text-muted-foreground">{title}</h3>
        </div>
        <WidgetHelpButton title={title} helpText={helpText} />
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-4 px-4 pb-4 pt-0">
        <div className={cn("flex flex-col", METRIC_WIDGET_STACK_GAP_CLASS)}>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <p
              className={cn(
                "font-bold tracking-tight tabular-nums text-foreground",
                FIGURE_24PX_CLASS
              )}
            >
              {value}
            </p>
            <TrendBadge label={trendLabel} trend={trend} />
          </div>
          <p className="text-xs text-muted-foreground @sm:text-sm">{comparisonLabel}</p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col pt-1">
          <div className="h-[4.75rem] w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 6, right: 0, left: 0, bottom: 0 }}>
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
                  strokeWidth={2}
                  fill={`url(#${gradientId})`}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-1 flex shrink-0 items-center justify-between gap-2 border-t border-border pt-3">
          <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="size-3.5 shrink-0" strokeWidth={2.25} />
            <span className="truncate">{scopeLabel}</span>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="size-3.5 shrink-0" strokeWidth={2.25} />
            <span className="tabular-nums">{rateLabel}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
