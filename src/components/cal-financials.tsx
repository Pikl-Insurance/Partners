import { DollarSign, Info, type LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ReportSection } from "@/components/report-section"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { type ActiveFilters, getCalFinProfile } from "@/lib/chart-data"

type FinancialMetric = {
  label: string
  value: string
  icon: LucideIcon
  description: string
  note?: string
}

export function CalFinancials({ filters }: { filters: ActiveFilters }) {
  const profile = getCalFinProfile(filters)
  const financialMetrics: FinancialMetric[] = [
    {
      label: "Total payable (GBP)",
      value: profile.totalPayable,
      icon: DollarSign,
      description: "Total amount payable to partners in GBP for the selected period.",
    },
    {
      label: "IPT (GBP)",
      value: profile.ipt,
      icon: DollarSign,
      description: "Insurance premium tax amount in GBP for the selected period.",
    },
    {
      label: "PISL comm (GBP)",
      value: profile.pislComm,
      icon: DollarSign,
      description: "PISL commission amount in GBP for the selected period.",
    },
    {
      label: "Capacity net (GBP)",
      value: profile.capacityNet,
      icon: DollarSign,
      description: "Net capacity value in GBP after deductions for the selected period.",
    },
    {
      label: "PISL amount payable (GBP)",
      value: profile.pislPayable,
      icon: DollarSign,
      description: "Total PISL amount payable in GBP for the selected period.",
    },
    {
      label: "Premium inc. IPT (GBP)",
      value: profile.premiumInc,
      icon: DollarSign,
      description: "Total premium including insurance premium tax in GBP.",
    },
    {
      label: "GWP (GBP)",
      value: profile.gwp,
      icon: DollarSign,
      description: "Gross written premium in GBP for the selected period.",
      note: "Gross written premium",
    },
  ]

  return (
    <TooltipProvider>
      <ReportSection
        title="CAL financials (GBP)"
        exportSlug="cal-financials"
        filters={filters}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {financialMetrics.map(({ label, value, icon: Icon, description, note }) => (
            <Card key={label}>
              <CardHeader className="items-center">
                <div className="flex items-center gap-2">
                  <div className="grid size-7 place-items-center rounded-md bg-muted text-muted-foreground">
                    <Icon className="size-3.5" />
                  </div>
                  <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                    {label}
                  </p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`More information about ${label}`}
                    >
                      <Info className="size-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{description}</TooltipContent>
                </Tooltip>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-medium tracking-tight">{value}</p>
                {note && (
                  <p className="mt-1 text-xs text-muted-foreground">{note}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ReportSection>
    </TooltipProvider>
  )
}
