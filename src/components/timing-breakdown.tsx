import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type TimingRow = {
  brand: string
  ccy: string
  avgLead: string
  calAvgLead: string
  color: string
}

const rows: TimingRow[] = [
  { brand: "Cottages.com", ccy: "GBP", avgLead: "118.2 days", calAvgLead: "156.3 days", color: "bg-blue-500" },
  { brand: "Hoseasons", ccy: "", avgLead: "103.5 days", calAvgLead: "—", color: "bg-cyan-500" },
  { brand: "Dansommer (DK)", ccy: "EUR", avgLead: "105.0 days", calAvgLead: "381.0 days", color: "bg-amber-500" },
  { brand: "Dansommer (EUR)", ccy: "", avgLead: "134.1 days", calAvgLead: "—", color: "bg-violet-500" },
  { brand: "Fincallorca (EUR)", ccy: "", avgLead: "162.0 days", calAvgLead: "—", color: "bg-rose-500" },
  { brand: "JamesVillas", ccy: "", avgLead: "157.5 days", calAvgLead: "—", color: "bg-lime-500" },
  { brand: "Novasol (DK)", ccy: "", avgLead: "130.1 days", calAvgLead: "169.0 days", color: "bg-pink-500" },
  { brand: "Novasol (EUR)", ccy: "", avgLead: "120.0 days", calAvgLead: "160.6 days", color: "bg-orange-500" },
]

export function TimingBreakdown() {
  const [open, setOpen] = useState(false)

  return (
    <section className="rounded-xl border border-border bg-card shadow-xs">
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold">Timing by partner</h3>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-1 text-sm leading-none text-muted-foreground transition-colors hover:text-foreground"
        >
          {open ? (
            <>Hide details <ChevronUp className="size-3.5" /></>
          ) : (
            <>View details <ChevronDown className="size-3.5" /></>
          )}
        </button>
      </div>

      {open && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>CCY</TableHead>
              <TableHead className="text-right">Avg lead</TableHead>
              <TableHead className="text-right">CAL avg lead</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.brand}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`size-2 rounded-full ${row.color}`} />
                    <span>{row.brand}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{row.ccy}</TableCell>
                <TableCell className="text-right tabular-nums">{row.avgLead}</TableCell>
                <TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">
                  {row.calAvgLead}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  )
}
