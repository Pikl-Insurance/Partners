import { AverageBookingValueSnapshot } from "@/components/average-booking-value-snapshot"
import { BookingsSnapshot } from "@/components/bookings-snapshot"
import { AbvPerDayChart } from "@/components/charts/abv-per-day-chart"
import { BookingsMadePerDayChart } from "@/components/charts/bookings-made-per-day-chart"
import { BookingsVsStaysChart } from "@/components/charts/bookings-vs-stays-chart"
import { CalDdlTakeupChart } from "@/components/charts/cal-ddl-takeup-chart"
import { LeadTimeChart } from "@/components/charts/lead-time-chart"
import { CalFinancials } from "@/components/cal-financials"
import { TimingSnapshot } from "@/components/timing-snapshot"
import { cn } from "@/lib/utils"
import type { ActiveFilters } from "@/lib/chart-data"

type InsightsReportPageProps = {
  filters: ActiveFilters
  wideLayout: boolean
}

function SectionDivider() {
  return <div aria-hidden className="h-px w-full bg-border" />
}

export function InsightsReportPage({ filters, wideLayout }: InsightsReportPageProps) {
  const sectionClass = cn("scroll-mt-6", wideLayout ? "py-4" : "py-8")

  if (wideLayout) {
    return (
      <div className="grid grid-cols-1 items-start gap-x-8 gap-y-6 xl:grid-cols-2">
        <div id="section-bookings" className={cn(sectionClass, "min-w-0")}>
          <BookingsSnapshot filters={filters} />
        </div>
        <div id="section-abv" className={cn(sectionClass, "min-w-0")}>
          <AverageBookingValueSnapshot filters={filters} />
        </div>
        <div id="section-cal" className={cn(sectionClass, "min-w-0")}>
          <CalFinancials filters={filters} />
        </div>
        <div id="section-timing" className={cn(sectionClass, "min-w-0")}>
          <TimingSnapshot filters={filters} />
        </div>
        <div id="section-bookings-vs-stays" className={cn(sectionClass, "min-w-0")}>
          <BookingsVsStaysChart filters={filters} />
        </div>
        <div id="section-abv-per-day" className={cn(sectionClass, "min-w-0")}>
          <AbvPerDayChart filters={filters} />
        </div>
        <div id="section-lead-time" className={cn(sectionClass, "min-w-0")}>
          <LeadTimeChart filters={filters} />
        </div>
        <div id="section-bookings-per-day" className={cn(sectionClass, "min-w-0")}>
          <BookingsMadePerDayChart filters={filters} />
        </div>
        <div id="section-cal-ddl-takeup" className={cn(sectionClass, "min-w-0 xl:col-span-2")}>
          <CalDdlTakeupChart filters={filters} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div id="section-bookings" className={cn(sectionClass, "min-w-0")}>
        <BookingsSnapshot filters={filters} />
      </div>
      <SectionDivider />

      <div id="section-abv" className={cn(sectionClass, "min-w-0")}>
        <AverageBookingValueSnapshot filters={filters} />
      </div>
      <SectionDivider />

      <div id="section-cal" className={cn(sectionClass, "min-w-0")}>
        <CalFinancials filters={filters} />
      </div>
      <SectionDivider />

      <div id="section-timing" className={cn(sectionClass, "min-w-0")}>
        <TimingSnapshot filters={filters} />
      </div>
      <SectionDivider />

      <div id="section-bookings-vs-stays" className={cn(sectionClass, "min-w-0")}>
        <BookingsVsStaysChart filters={filters} />
      </div>
      <SectionDivider />

      <div id="section-abv-per-day" className={cn(sectionClass, "min-w-0")}>
        <AbvPerDayChart filters={filters} />
      </div>
      <SectionDivider />

      <div id="section-lead-time" className={cn(sectionClass, "min-w-0")}>
        <LeadTimeChart filters={filters} />
      </div>
      <SectionDivider />

      <div id="section-bookings-per-day" className={cn(sectionClass, "min-w-0")}>
        <BookingsMadePerDayChart filters={filters} />
      </div>
      <SectionDivider />

      <div id="section-cal-ddl-takeup" className={cn(sectionClass, "min-w-0")}>
        <CalDdlTakeupChart filters={filters} />
      </div>
    </div>
  )
}
