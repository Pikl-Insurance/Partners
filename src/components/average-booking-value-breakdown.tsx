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

type AbvRow = {
  brand: string
  ccy: string
  abv: string
  calAbv: string
  abvIncFee: string
  calPricePct: string
  color: string
}

const rows: AbvRow[] = [
  {
    brand: "Cottages.com",
    ccy: "GBP",
    abv: "£676",
    calAbv: "£755",
    abvIncFee: "£718",
    calPricePct: "7.7%",
    color: "bg-blue-500",
  },
  {
    brand: "Hoseasons",
    ccy: "",
    abv: "£507",
    calAbv: "—",
    abvIncFee: "£501",
    calPricePct: "—",
    color: "bg-cyan-500",
  },
  {
    brand: "Dansommer (DK)",
    ccy: "EUR",
    abv: "€1,205",
    calAbv: "€3,168",
    abvIncFee: "€1,173",
    calPricePct: "10.0%",
    color: "bg-amber-500",
  },
  {
    brand: "Dansommer (EUR)",
    ccy: "",
    abv: "€1,402",
    calAbv: "—",
    abvIncFee: "€1,396",
    calPricePct: "—",
    color: "bg-violet-500",
  },
  {
    brand: "Fincallorca (EUR)",
    ccy: "",
    abv: "€3,422",
    calAbv: "—",
    abvIncFee: "€3,391",
    calPricePct: "—",
    color: "bg-rose-500",
  },
  {
    brand: "JamesVillas",
    ccy: "",
    abv: "£3,672",
    calAbv: "—",
    abvIncFee: "£3,622",
    calPricePct: "—",
    color: "bg-lime-500",
  },
  {
    brand: "Novasol (DK)",
    ccy: "",
    abv: "€1,102",
    calAbv: "€1,007",
    abvIncFee: "€1,071",
    calPricePct: "10.1%",
    color: "bg-pink-500",
  },
  {
    brand: "Novasol (EUR)",
    ccy: "",
    abv: "€1,204",
    calAbv: "€1,084",
    abvIncFee: "€1,194",
    calPricePct: "10.1%",
    color: "bg-orange-500",
  },
]

export function AverageBookingValueBreakdown() {
  const [open, setOpen] = useState(false)

  return (
    <section className="rounded-xl border border-border bg-card shadow-xs">
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold">Average booking value by partner</h3>
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

      {open ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Brand</TableHead>
              <TableHead>CCY</TableHead>
              <TableHead className="text-right">ABV</TableHead>
              <TableHead className="text-right">CAL ABV</TableHead>
              <TableHead className="text-right">ABV inc. fee</TableHead>
              <TableHead className="text-right">CAL price %</TableHead>
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
                <TableCell className="text-right tabular-nums">{row.abv}</TableCell>
                <TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">
                  {row.calAbv}
                </TableCell>
                <TableCell className="text-right tabular-nums">{row.abvIncFee}</TableCell>
                <TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">
                  {row.calPricePct}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </section>
  )
}
