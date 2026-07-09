import { FileText } from "lucide-react"

import { PARTNER_BRANDING } from "@/lib/partner-branding"
import type { ReportingFilters } from "@/components/reporting-filter-sidebar"

type ReportingPageProps = {
  filters: ReportingFilters
  hasRun: boolean
}

/** Set to true to restore the mock report form preview beside the empty state. */
const SHOW_REPORT_PREVIEW = false

const brandLabel: Record<string, string> = {
  "brand-a": "Alpha",
  "brand-b": "Beta",
  "brand-c": "Gamma",
}

const periodLabel: Record<ReportingFilters["period"], string> = {
  day: "Day",
  week: "Week",
  month: "Month",
  quarter: "Quarter",
  ytd: "Year to date",
  custom: "Custom range",
}

function MockReportFormPreview({ filters }: { filters: ReportingFilters }) {
  const brandA = brandLabel[filters.brandA] ?? filters.brandA
  const brandB = brandLabel[filters.brandB] ?? filters.brandB

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs">
      <div className="border-b border-border/60 bg-muted/30 px-5 py-3">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Report preview
        </p>
        <p className="mt-1 text-sm font-semibold text-foreground">
          Brand performance form
        </p>
      </div>

      <div className="relative bg-gradient-to-b from-muted/20 to-background p-6">
        <div className="mx-auto max-w-md overflow-hidden rounded-xl border border-border bg-background shadow-sm">
          <div className="border-b border-border px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-foreground">{PARTNER_BRANDING.logoName}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {periodLabel[filters.period]} report
                </p>
              </div>
              <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                Draft
              </span>
            </div>
          </div>

          <div className="space-y-4 px-5 py-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-border/70 bg-muted/20 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Brand A</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{brandA}</p>
              </div>
              <div className="rounded-lg border border-border/70 bg-muted/20 px-3 py-2.5">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  {filters.compareEnabled ? "Brand B" : "Compare"}
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {filters.compareEnabled ? brandB : "Off"}
                </p>
              </div>
            </div>

            <div className="space-y-2.5">
              {["Bookings", "Attachment", "Margin", "IPB"].map((field, index) => (
                <div key={field} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] text-muted-foreground">{field}</p>
                    <div className="h-2 w-16 rounded-full bg-muted" />
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="h-8 flex-1 rounded-md border border-dashed border-border bg-muted/30"
                      style={{ opacity: 1 - index * 0.12 }}
                    />
                    {filters.compareEnabled ? (
                      <div
                        className="h-8 flex-1 rounded-md border border-dashed border-border bg-muted/20"
                        style={{ opacity: 0.85 - index * 0.12 }}
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-dashed border-border bg-muted/15 px-3 py-3">
              <div className="h-2 w-24 rounded-full bg-muted" />
              <div className="mt-2 h-2 w-full rounded-full bg-muted/70" />
              <div className="mt-1.5 h-2 w-3/4 rounded-full bg-muted/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ReportingPage({ filters, hasRun }: ReportingPageProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight">Reporting</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Build and run brand comparison reports for {PARTNER_BRANDING.name}.
        </p>
      </div>

      <div
        className={
          SHOW_REPORT_PREVIEW
            ? "grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]"
            : undefined
        }
      >
        <div className="flex min-h-[28rem] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-24 text-center">
          <span className="grid size-10 place-items-center rounded-xl bg-muted text-muted-foreground">
            <FileText className="size-4" />
          </span>
          <p className="mt-4 text-sm font-semibold text-foreground">
            {hasRun ? "Report ready" : "No report yet"}
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {hasRun
              ? "Your report will appear here once data is connected."
              : "Choose a period and brands in the filter bar, then run a report to populate this stage."}
          </p>
        </div>

        {SHOW_REPORT_PREVIEW ? <MockReportFormPreview filters={filters} /> : null}
      </div>
    </div>
  )
}
