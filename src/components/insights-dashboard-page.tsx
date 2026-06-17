import {
  CalendarCheck,
  Clock,
  CreditCard,
  Gauge,
  Percent,
  PoundSterling,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { getPartnerRows } from "@/components/bookings-snapshot"
import { AbvPerDayChart } from "@/components/charts/abv-per-day-chart"
import { BookingsMadePerDayChart } from "@/components/charts/bookings-made-per-day-chart"
import { BookingsVsStaysChart } from "@/components/charts/bookings-vs-stays-chart"
import { CalDdlTakeupChart } from "@/components/charts/cal-ddl-takeup-chart"
import { LeadTimeChart } from "@/components/charts/lead-time-chart"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  type ActiveFilters,
  getAbvProfile,
  getBookingProfile,
  getCalFinProfile,
  getTimingProfile,
} from "@/lib/chart-data"

type InsightsDashboardPageProps = {
  filters: ActiveFilters
}

type KpiCard = {
  label: string
  value: string
  subtext?: string
  icon: LucideIcon
}

function DashboardKpiCard({ label, value, subtext, icon: Icon }: KpiCard) {
  return (
    <Card className="shadow-none">
      <CardHeader className="items-center p-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-md bg-muted text-muted-foreground">
            <Icon className="size-3.5" />
          </div>
          <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
            {label}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-xl font-medium tracking-tight tabular-nums">{value}</p>
        {subtext ? (
          <p className="mt-1 text-[11px] text-muted-foreground">{subtext}</p>
        ) : null}
      </CardContent>
    </Card>
  )
}

function formatFilterLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export function InsightsDashboardPage({ filters }: InsightsDashboardPageProps) {
  const booking = getBookingProfile(filters)
  const abv = getAbvProfile(filters)
  const calFin = getCalFinProfile(filters)
  const timing = getTimingProfile(filters)
  const partnerRows = getPartnerRows(filters)

  const primaryKpis: KpiCard[] = [
    { label: "Total bookings", value: booking.total, icon: CalendarCheck },
    { label: "GWP", value: calFin.gwp, icon: PoundSterling, subtext: "Gross written premium" },
    { label: "GBP ABV", value: abv.gbpAbv, icon: Wallet, subtext: abv.gbpCal },
    { label: "CAL take-up", value: booking.calPct, icon: Percent, subtext: `${booking.calSales} sales` },
    { label: "DDL take-up", value: booking.ddlPct, icon: CreditCard, subtext: `${booking.ddlSales} sales` },
    { label: "Avg lead time", value: timing.gbpDays, icon: Clock, subtext: timing.gbpCal },
  ]

  const secondaryKpis: KpiCard[] = [
    { label: "Total payable", value: calFin.totalPayable, icon: TrendingUp },
    { label: "Premium inc. IPT", value: calFin.premiumInc, icon: Gauge },
    { label: "EUR ABV", value: abv.eurAbv, icon: Wallet, subtext: abv.eurCal },
    { label: "CAL price %", value: abv.calPct, icon: Percent },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {[
          formatFilterLabel(filters.partner),
          formatFilterLabel(filters.brand),
          filters.dateRange.replace(/-/g, " "),
          `${filters.month} ${filters.year}`,
        ].map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {primaryKpis.map((kpi) => (
          <DashboardKpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <BookingsVsStaysChart filters={filters} />
        </div>
        <CalDdlTakeupChart filters={filters} />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <LeadTimeChart filters={filters} />
        <AbvPerDayChart filters={filters} />
      </div>

      <BookingsMadePerDayChart filters={filters} />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {secondaryKpis.map((kpi) => (
          <DashboardKpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <div className="border-b border-border px-5 py-4">
          <h3 className="text-sm font-semibold">Partner performance</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Bookings, CAL and DDL by partner for the selected filters
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="h-11 px-5">Brand</TableHead>
              <TableHead className="px-5">CCY</TableHead>
              <TableHead className="px-5 text-right">Bookings</TableHead>
              <TableHead className="px-5 text-right">CAL</TableHead>
              <TableHead className="px-5 text-right">DDL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partnerRows.map((row) => (
              <TableRow key={row.brand}>
                <TableCell className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${row.color}`} />
                    <span className="text-sm">{row.brand}</span>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-3 text-sm text-muted-foreground">{row.ccy}</TableCell>
                <TableCell className="px-5 py-3 text-right text-sm tabular-nums">
                  {row.bookings}
                </TableCell>
                <TableCell className="px-5 py-3 text-right text-sm tabular-nums text-emerald-600 dark:text-emerald-400">
                  {row.cal}
                </TableCell>
                <TableCell className="px-5 py-3 text-right text-sm tabular-nums text-amber-600 dark:text-amber-400">
                  {row.ddl}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
