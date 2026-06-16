import { Clock, Info, Timer } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type CurrencyTiming = {
  currency: "GBP" | "EUR"
  flag: "uk" | "eu"
  value: string
  cal: string
}

type TimingCard = {
  label: string
  icon: typeof Clock
  description: string
  columns?: [CurrencyTiming, CurrencyTiming]
  emptyNote?: string
}

const timingCards: TimingCard[] = [
  {
    label: "Avg booking to stay",
    icon: Clock,
    description: "Average number of days between booking date and stay start date.",
    columns: [
      { currency: "GBP", flag: "uk", value: "110.4 days", cal: "CAL 156.3 days" },
      { currency: "EUR", flag: "eu", value: "122.9 days", cal: "CAL 163.8 days" },
    ],
  },
  {
    label: "Avg cancellation to stay",
    icon: Timer,
    description: "Average number of days between cancellation date and stay start date.",
    emptyNote: "Days from cancellation to stay start",
  },
]

function FlagBadge({ type }: { type: "uk" | "eu" }) {
  const src = type === "uk" ? "https://flagcdn.com/w40/gb.png" : "https://flagcdn.com/w40/eu.png"
  const alt = type === "uk" ? "United Kingdom flag" : "European Union flag"
  return (
    <span className="inline-flex size-4 overflow-hidden rounded-full border border-border/80 bg-background">
      <img src={src} alt={alt} className="size-full object-cover" />
    </span>
  )
}

export function TimingSnapshot() {
  return (
    <TooltipProvider>
      <section>
        <h2 className="mb-3 text-xs font-semibold tracking-wide uppercase">Timing</h2>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {timingCards.map(({ label, icon: Icon, description, columns, emptyNote }) => (
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
                  {columns ? (
                    <div className="grid grid-cols-2 divide-x divide-border">
                      {columns.map((col, i) => (
                        <div key={col.currency} className={i === 0 ? "pr-4" : "pl-4"}>
                          <div className="mb-1 flex items-center gap-1.5">
                            <FlagBadge type={col.flag} />
                            <span className="text-sm font-medium tracking-wide text-muted-foreground">
                              {col.currency}
                            </span>
                          </div>
                          <p className="text-xl font-medium tracking-tight">{col.value}</p>
                          <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            {col.cal}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl font-medium tracking-tight text-muted-foreground">—</p>
                      <p className="mt-2 text-sm text-muted-foreground">{emptyNote}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </TooltipProvider>
  )
}
