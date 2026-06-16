import {
  CalendarCheck,
  CreditCard,
  Gauge,
  Info,
  Percent,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type BookingMetric = {
  label: string
  value: string
  icon: LucideIcon
  description: string
}

const bookingMetrics: BookingMetric[] = [
  {
    label: "Total bookings",
    value: "563,016",
    icon: CalendarCheck,
    description: "Total number of bookings across all selected partners and brands.",
  },
  {
    label: "CAL sales",
    value: "14,008",
    icon: TrendingUp,
    description: "Sales completed through the CAL payment method for the selected period.",
  },
  {
    label: "CAL take-up %",
    value: "2.5%",
    icon: Percent,
    description: "Percentage of eligible bookings that converted to CAL sales.",
  },
  {
    label: "DDL sales",
    value: "2",
    icon: CreditCard,
    description: "Sales completed through direct debit (DDL) for the selected period.",
  },
  {
    label: "DDL take-up %",
    value: "0.0%",
    icon: Gauge,
    description: "Percentage of eligible bookings that converted to DDL sales.",
  },
]

export function BookingsSnapshot() {
  return (
    <TooltipProvider>
      <section>
        <h2 className="mb-3 text-xs font-semibold tracking-wide uppercase">Bookings</h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {bookingMetrics.map(({ label, value, icon: Icon, description }) => (
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
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </TooltipProvider>
  )
}
