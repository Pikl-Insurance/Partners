import { useState } from "react"
import { LayoutList } from "lucide-react"

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
  { brand: "Partner Alpha", ccy: "GBP", avgLead: "92.4 days", calAvgLead: "118.7 days", color: "bg-blue-500" },
  { brand: "Partner Beta", ccy: "GBP", avgLead: "86.1 days", calAvgLead: "—", color: "bg-cyan-500" },
  { brand: "Partner Gamma (DK)", ccy: "EUR", avgLead: "101.3 days", calAvgLead: "142.0 days", color: "bg-amber-500" },
  { brand: "Partner Gamma (EUR)", ccy: "EUR", avgLead: "115.6 days", calAvgLead: "—", color: "bg-violet-500" },
  { brand: "Partner Delta (EUR)", ccy: "EUR", avgLead: "128.4 days", calAvgLead: "—", color: "bg-rose-500" },
  { brand: "Partner Epsilon", ccy: "GBP", avgLead: "134.2 days", calAvgLead: "—", color: "bg-lime-500" },
  { brand: "Partner Zeta (DK)", ccy: "EUR", avgLead: "109.8 days", calAvgLead: "138.5 days", color: "bg-pink-500" },
  { brand: "Partner Zeta (EUR)", ccy: "EUR", avgLead: "97.3 days", calAvgLead: "124.9 days", color: "bg-orange-500" },
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
          aria-label={open ? "Hide timing breakdown" : "Show timing breakdown"}
          className={`rounded-md p-1.5 transition-colors hover:bg-accent ${open ? "text-foreground" : "text-muted-foreground"}`}
        >
          <LayoutList className="size-4" />
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
                <TableCell className="text-right tabular-nums text-primary">
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
