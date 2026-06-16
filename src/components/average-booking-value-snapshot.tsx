import { FileText, Info, Percent, Wallet, type LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type CurrencyColumn = {
  currency: "GBP" | "EUR"
  flag: "uk" | "eu"
  value: string
  cal: string
}

type CurrencyAbvMetric = {
  label: string
  icon: LucideIcon
  description: string
  columns: [CurrencyColumn, CurrencyColumn]
}

const currencyAbvMetrics: CurrencyAbvMetric[] = [
  {
    label: "ABV (excl. booking fee)",
    icon: Wallet,
    description: "Average booking value excluding the booking fee.",
    columns: [
      { currency: "GBP", flag: "uk", value: "£586", cal: "CAL £755" },
      { currency: "EUR", flag: "eu", value: "€1,192", cal: "CAL €1,055" },
    ],
  },
  {
    label: "ABV inc. booking fee",
    icon: FileText,
    description: "Average booking value including the booking fee.",
    columns: [
      { currency: "GBP", flag: "uk", value: "£603", cal: "CAL £801" },
      { currency: "EUR", flag: "eu", value: "€1,176", cal: "CAL €1,042" },
    ],
  },
]

export function AverageBookingValueSnapshot() {
  return (
    <TooltipProvider>
      <section>
        <h2 className="mb-3 text-xs font-semibold tracking-wide uppercase">
          Average booking value
        </h2>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {currencyAbvMetrics.map(({ label, icon: Icon, description, columns }) => (
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
                <div className="border-t border-border pt-4">
                  <div className="grid grid-cols-2 divide-x divide-border">
                    {columns.map((column, index) => (
                      <div
                        key={column.currency}
                        className={cn("min-w-0 px-4", index === 0 && "pl-0", index === 1 && "pr-0")}
                      >
                        <div className="mb-1 flex items-center gap-1.5">
                          <FlagBadge type={column.flag} />
                          <span className="text-sm font-medium tracking-wide text-muted-foreground">
                            {column.currency}
                          </span>
                        </div>
                        <p className="text-xl font-medium tracking-tight">{column.value}</p>
                        <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          {column.cal}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader className="items-center">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-md bg-muted text-muted-foreground">
                  <Percent className="size-3.5" />
                </div>
                <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                  CAL customer price
                </p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="More information about CAL customer price"
                  >
                    <Info className="size-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  Share of customer price against ABV including booking fee.
                </TooltipContent>
              </Tooltip>
            </CardHeader>

            <CardContent>
              <div className="border-t border-border pt-4">
                <p className="text-xl font-medium tracking-tight">9.7%</p>
                <p className="mt-2 text-sm text-muted-foreground">% of ABV inc. booking fee</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </TooltipProvider>
  )
}

function FlagBadge({ type }: { type: "uk" | "eu" }) {
  const src =
    type === "uk" ? "https://flagcdn.com/w40/gb.png" : "https://flagcdn.com/w40/eu.png"
  const alt = type === "uk" ? "United Kingdom flag" : "European Union flag"

  return (
    <span className="inline-flex size-4 overflow-hidden rounded-full border border-border/80 bg-background">
      <img src={src} alt={alt} className="size-full object-cover" />
    </span>
  )
}
