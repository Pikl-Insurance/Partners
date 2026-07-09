import type { ReactNode } from "react"
import {
  Activity,
  BarChart3,
  CalendarRange,
  Gauge,
  PieChart,
  Shield,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { ChannelGridTable } from "@/components/sykes/channel-grid-table"
import { PhasingChartsVisual } from "@/components/sykes/phasing-charts-visual"
import {
  PropositionVisualSection,
  RevenueOverviewVisual,
  TotalProductsVisual,
} from "@/components/sykes/revenue-overview-visual"
import {
  CollapsibleDataTable,
  NoteTooltip,
  VisualCard,
} from "@/components/sykes/sykes-visual-primitives"
import type { ActiveFilters } from "@/lib/chart-data"
import {
  CONTRIBUTION_TO_PERFORMANCE_GRID,
  DAMAGE_DEPOSIT_WAIVER_GRID,
  DASHBOARD_FOOTNOTES,
  DEPARTURES_BY_DATE_DATA,
  EVENTS_BY_DATE_DECLINING_DATA,
  EVENTS_BY_DATE_SUMMER_DATA,
  FINANCIALS_GRID,
  FLEXIBLE_CANCELLATION_GRID,
  PERFORMANCE_METRICS_GRID,
  PROPOSITION_NOTES,
} from "@/lib/sykes-dashboard-data"
import { cn } from "@/lib/utils"

type SykesPartnerDashboardPageProps = {
  filters: ActiveFilters
}

function DashboardSection({
  id,
  title,
  subtitle,
  note,
  icon: Icon,
  children,
  className,
}: {
  id: string
  title: string
  subtitle?: string
  note?: string
  icon?: LucideIcon
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 space-y-5", className)}>
      <div className="flex items-start gap-2.5">
        {Icon ? (
          <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
            <Icon className="size-3.5" />
          </div>
        ) : null}
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
            {note ? <NoteTooltip note={note} /> : null}
          </div>
          {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  )
}

function SectionDivider() {
  return <div aria-hidden className="my-10 h-px w-full bg-border/60" />
}

function MetricNameRow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 py-2.5 text-sm last:border-b-0">
      <span className="min-w-0 text-foreground">{label}</span>
      <span className="shrink-0 text-[11px] font-medium text-muted-foreground">
        By channel
      </span>
    </div>
  )
}

function PerformanceMetricsVisual() {
  const categories = [
    { title: "Cancellation & relet", rows: PERFORMANCE_METRICS_GRID.slice(0, 8) },
    { title: "Booking behaviour", rows: PERFORMANCE_METRICS_GRID.slice(8, 14) },
    { title: "Lead times", rows: PERFORMANCE_METRICS_GRID.slice(14) },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {categories.map((category) => (
          <VisualCard key={category.title} title={category.title} subtitle="Website · App · Offline · OTA">
            <div className="max-h-80 overflow-y-auto pr-1">
              {category.rows.map((row) => (
                <MetricNameRow key={row.label} label={row.label} />
              ))}
            </div>
          </VisualCard>
        ))}
      </div>
      <CollapsibleDataTable title="View full performance metrics table">
        <ChannelGridTable rows={PERFORMANCE_METRICS_GRID} className="border-0 shadow-none" />
      </CollapsibleDataTable>
    </div>
  )
}

function FinancialsVisual() {
  return (
    <div className="space-y-4">
      <VisualCard title="Financial metrics tracked" subtitle="Split by channel, with direct and total roll-ups">
        <div className="grid gap-x-8 sm:grid-cols-2">
          {FINANCIALS_GRID.map((row) => (
            <MetricNameRow key={row.label} label={row.label} />
          ))}
        </div>
      </VisualCard>
      <CollapsibleDataTable title="View full financials breakdown by channel">
        <ChannelGridTable rows={FINANCIALS_GRID} className="border-0 shadow-none" />
      </CollapsibleDataTable>
    </div>
  )
}

export function SykesPartnerDashboardPage({ filters }: SykesPartnerDashboardPageProps) {
  return (
    <div className="space-y-0">
      <DashboardSection
        id="section-revenue-overview"
        title="Partner performance overview"
        subtitle={`${filters.month} ${filters.year}${
          filters.dateRange === "year-to-month-end" ? " · year to month-end" : ""
        }`}
        icon={Gauge}
      >
        <RevenueOverviewVisual />
        <div className="rounded-xl border border-border bg-muted/20 px-4 py-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Notes
          </p>
          <ol className="list-decimal space-y-1 pl-4 text-xs text-muted-foreground">
            {DASHBOARD_FOOTNOTES.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ol>
        </div>
      </DashboardSection>

      <SectionDivider />

      <DashboardSection
        id="section-total-products"
        title="Total products"
        note={PROPOSITION_NOTES.layout}
        icon={PieChart}
      >
        <TotalProductsVisual />
      </DashboardSection>

      <SectionDivider />

      <DashboardSection
        id="section-flexible-cancellation"
        title="Flexible cancellation"
        note={PROPOSITION_NOTES.flexibleCancellation}
        icon={Shield}
      >
        <PropositionVisualSection
          title="Flexible cancellation performance"
          subtitle="Volume, attachment and margin by channel"
          accentClass="border-border bg-card"
          channelBars={[
            { label: "Website", value: "A" },
            { label: "App", value: "B" },
            { label: "Offline", value: "C" },
            { label: "OTA", value: "D" },
          ]}
          rateCards={[
            { label: "FC guest price avg", value: "10%", tone: "bg-muted/40" },
            { label: "Insurance premium rate avg", value: "6.35%", tone: "bg-muted/40" },
            { label: "Out of test conversion", value: "1.0%", tone: "bg-muted/50" },
            { label: "Conversion benefit", value: "1% = £900,000", tone: "bg-muted/50" },
          ]}
          table={
            <CollapsibleDataTable title="View full flexible cancellation table">
              <ChannelGridTable rows={FLEXIBLE_CANCELLATION_GRID} className="border-0 shadow-none" />
            </CollapsibleDataTable>
          }
        />
      </DashboardSection>

      <SectionDivider />

      <DashboardSection id="section-damage-deposit-waiver" title="Damage deposit waiver" icon={ShieldCheck}>
        <PropositionVisualSection
          title="Damage deposit waiver performance"
          subtitle="Volume, attachment and margin by channel"
          accentClass="border-border bg-card"
          channelBars={[
            { label: "Website", value: "A" },
            { label: "App", value: "B" },
            { label: "Offline", value: "C" },
            { label: "OTA", value: "D" },
          ]}
          rateCards={[
            { label: "DDL guest price avg", value: "£30", tone: "bg-muted/40" },
            { label: "Insurance premium rate avg", value: "2.12%", tone: "bg-muted/40" },
            { label: "Out of test conversion", value: "—", tone: "bg-muted/50" },
            { label: "App / Offline / OTA", value: "N/A", tone: "bg-muted/30" },
          ]}
          table={
            <CollapsibleDataTable title="View full damage deposit waiver table">
              <ChannelGridTable rows={DAMAGE_DEPOSIT_WAIVER_GRID} className="border-0 shadow-none" />
            </CollapsibleDataTable>
          }
        />
      </DashboardSection>

      <SectionDivider />

      <DashboardSection id="section-contribution" title="Contribution to performance" icon={Activity}>
        <VisualCard title="Cancellation contribution" subtitle="Volume and average rate, by channel">
          <div className="grid gap-x-8 sm:grid-cols-2">
            {CONTRIBUTION_TO_PERFORMANCE_GRID.map((row) => (
              <MetricNameRow key={row.label} label={row.label} />
            ))}
          </div>
        </VisualCard>
        <CollapsibleDataTable title="View contribution breakdown by channel">
          <ChannelGridTable rows={CONTRIBUTION_TO_PERFORMANCE_GRID} className="border-0 shadow-none" />
        </CollapsibleDataTable>
      </DashboardSection>

      <SectionDivider />

      <DashboardSection id="section-performance-metrics" title="Performance metrics by channel" icon={BarChart3}>
        <PerformanceMetricsVisual />
      </DashboardSection>

      <SectionDivider />

      <DashboardSection
        id="section-financials"
        title="Financials"
        note="Consider splitting financials by proposition (flexible cancellation vs damage deposit waiver)."
        icon={Wallet}
      >
        <FinancialsVisual />
      </DashboardSection>

      <SectionDivider />

      <DashboardSection
        id="section-phasing"
        title="Phasing & event trends"
        subtitle="Margin from flexible cancellation, when people are travelling, and cancellation/relet rate"
        icon={CalendarRange}
      >
        <PhasingChartsVisual
          eventsSummer={EVENTS_BY_DATE_SUMMER_DATA}
          eventsDeclining={EVENTS_BY_DATE_DECLINING_DATA}
          departures={DEPARTURES_BY_DATE_DATA}
        />
      </DashboardSection>
    </div>
  )
}
