import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Clock,
  Gauge,
  PoundSterling,
  Zap,
  type LucideIcon,
} from "lucide-react"
import type { ReactNode } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  BOOKING_ENGINE_SUMMARY,
  formatCount,
  formatCurrency,
} from "@/lib/booking-engine-data"
import {
  type ActiveFilters,
  deriveBookingTrendMeta,
  deriveFinancialTrendMeta,
  getAbvProfile,
  getBookingProfile,
  getCalFinProfile,
  getTimingProfile,
} from "@/lib/chart-data"
import { cn } from "@/lib/utils"

export type LandingDestination =
  | { section: "booking-engine" }
  | { section: "insights"; anchor?: string }
  | { section: "admin" }

type LandingDashboardPageProps = {
  filters: ActiveFilters
  onNavigate: (destination: LandingDestination) => void
}

type SnapshotMetric = {
  label: string
  value: string
  subtext?: string
}

type SnapshotCardConfig = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  destination: LandingDestination
  metrics: SnapshotMetric[]
}

function formatFilterContext(filters: ActiveFilters) {
  const partner =
    filters.partner === "all-partners"
      ? "All partners"
      : filters.partner.replace("partner-", "Partner ").replace(/\b\w/g, (c) => c.toUpperCase())
  const brand =
    filters.brand === "all-brands"
      ? "all brands"
      : filters.brand.replace("brand-", "Brand ").replace(/\b\w/g, (c) => c.toUpperCase())
  const range =
    filters.dateRange === "year-to-month-end"
      ? `YTD to ${filters.month} ${filters.year}`
      : `${filters.month} ${filters.year}`

  return `${partner} · ${brand} · ${range}`
}

function SnapshotNavCard({
  title,
  description,
  icon: Icon,
  metrics,
  onClick,
}: Omit<SnapshotCardConfig, "id" | "destination"> & { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="h-full bg-card shadow-xs transition-colors group-hover:border-foreground/20 group-hover:bg-accent/30">
        <CardContent className="flex h-full flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-background group-hover:text-foreground">
              <Icon className="size-4" />
            </div>
            <ArrowRight className="size-4 shrink-0 translate-x-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
          </div>

          <div className="mt-3 min-w-0 flex-1">
            <p className="text-sm font-semibold tracking-tight">{title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
          </div>

          <dl className="mt-4 grid gap-3 border-t border-border/60 pt-4 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="min-w-0">
                <dt className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  {metric.label}
                </dt>
                <dd className="mt-0.5 text-base font-medium tabular-nums tracking-tight">
                  {metric.value}
                </dd>
                {metric.subtext ? (
                  <dd className="mt-0.5 text-[11px] text-muted-foreground">{metric.subtext}</dd>
                ) : null}
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </button>
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
      {children}
    </h2>
  )
}

export function LandingDashboardPage({ filters, onNavigate }: LandingDashboardPageProps) {
  const booking = getBookingProfile(filters)
  const bookingTrend = deriveBookingTrendMeta(booking.total)
  const abv = getAbvProfile(filters)
  const calFin = getCalFinProfile(filters)
  const calFinTrend = deriveFinancialTrendMeta(calFin.totalPayable)
  const timing = getTimingProfile(filters)

  const policyCard: SnapshotCardConfig = {
    id: "policy-admin",
    title: "Partners & policies",
    description: "Configure connections, manage brands, and review active policy rates.",
    icon: Zap,
    destination: { section: "booking-engine" },
    metrics: [
      {
        label: "Bookings",
        value: formatCount(BOOKING_ENGINE_SUMMARY.totalBookings),
        subtext: "Across all partners",
      },
      {
        label: "Revenue",
        value: formatCurrency(BOOKING_ENGINE_SUMMARY.totalRevenue, "GBP"),
        subtext: `${BOOKING_ENGINE_SUMMARY.partners} partners · ${BOOKING_ENGINE_SUMMARY.activeBrands} brands`,
      },
    ],
  }

  const insightCards: SnapshotCardConfig[] = [
    {
      id: "bookings",
      title: "Bookings",
      description: "Total volume, CAL & DDL take-up, and partner breakdown.",
      icon: CalendarCheck,
      destination: { section: "insights", anchor: "section-bookings" },
      metrics: [
        { label: "Total bookings", value: booking.total, subtext: bookingTrend.dailyAverage },
        {
          label: "CAL sales",
          value: booking.calSales,
          subtext: `${booking.calPct} take-up`,
        },
      ],
    },
    {
      id: "abv",
      title: "Average booking value",
      description: "Customer price, ABV benchmarks, and CAL attachment.",
      icon: Gauge,
      destination: { section: "insights", anchor: "section-abv" },
      metrics: [
        { label: "GBP ABV", value: abv.gbpAbv, subtext: abv.gbpCal },
        { label: "CAL price", value: abv.calPct, subtext: `EUR ${abv.eurAbv.replace("€", "")}` },
      ],
    },
    {
      id: "cal-financials",
      title: "CAL financials",
      description: "Total payable, premium breakdown, and GWP.",
      icon: PoundSterling,
      destination: { section: "insights", anchor: "section-cal" },
      metrics: [
        {
          label: "Total payable",
          value: calFin.totalPayable,
          subtext: `${calFinTrend.trendLabel} vs prior period`,
        },
        { label: "GWP", value: calFin.gwp, subtext: "Gross written premium" },
      ],
    },
    {
      id: "timing",
      title: "Timing",
      description: "Lead time from booking to stay, with CAL benchmarks.",
      icon: Clock,
      destination: { section: "insights", anchor: "section-timing" },
      metrics: [
        { label: "GBP lead time", value: timing.gbpDays, subtext: timing.gbpCal },
        { label: "EUR lead time", value: timing.eurDays, subtext: timing.eurCal },
      ],
    },
  ]

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Welcome back, Courtney</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            A quick overview across policy admin and insights — pick a snapshot to dive deeper.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          <BarChart3 className="size-3.5 shrink-0" />
          <span>{formatFilterContext(filters)}</span>
        </div>
      </div>

      <section className="space-y-4">
        <SectionHeading>Operations</SectionHeading>
        <div className="max-w-xl">
          <SnapshotNavCard
            {...policyCard}
            onClick={() => onNavigate(policyCard.destination)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionHeading>Insights</SectionHeading>
          <button
            type="button"
            onClick={() => onNavigate({ section: "insights" })}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View full report
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-2")}>
          {insightCards.map((card) => (
            <SnapshotNavCard
              key={card.id}
              {...card}
              onClick={() => onNavigate(card.destination)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
