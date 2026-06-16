import { DollarSign, Info, type LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type FinancialMetric = {
  label: string
  value: string
  icon: LucideIcon
  description: string
  note?: string
}

const financialMetrics: FinancialMetric[] = [
  {
    label: "Total payable (GBP)",
    value: "£896,029",
    icon: DollarSign,
    description: "Total amount payable to partners in GBP for the selected period.",
  },
  {
    label: "IPT (GBP)",
    value: "£96,096",
    icon: DollarSign,
    description: "Insurance premium tax amount in GBP for the selected period.",
  },
  {
    label: "PISL comm (GBP)",
    value: "£253,065",
    icon: DollarSign,
    description: "PISL commission amount in GBP for the selected period.",
  },
  {
    label: "Capacity net (GBP)",
    value: "£546,867",
    icon: DollarSign,
    description: "Net capacity value in GBP after deductions for the selected period.",
  },
  {
    label: "PISL amount payable (GBP)",
    value: "£642,963",
    icon: DollarSign,
    description: "Total PISL amount payable in GBP for the selected period.",
  },
  {
    label: "Premium inc. IPT (GBP)",
    value: "£1,376,887",
    icon: DollarSign,
    description: "Total premium including insurance premium tax in GBP.",
  },
  {
    label: "GWP (GBP)",
    value: "£1,336,787",
    icon: DollarSign,
    description: "Gross written premium in GBP for the selected period.",
    note: "Gross written premium",
  },
]

export function CalFinancials() {
  return (
    <TooltipProvider>
      <section>
        <h2 className="mb-3 text-xs font-semibold tracking-wide uppercase">
          CAL financials (GBP)
        </h2>

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
      </section>
    </TooltipProvider>
  )
}
