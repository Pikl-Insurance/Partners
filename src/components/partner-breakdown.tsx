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

type PartnerRow = {
  brand: string
  ccy: string
  bookings: string
  cal: string
  ddl: string
  color: string
}

const rows: PartnerRow[] = [
  { brand: "Cottages.com", ccy: "GBP", bookings: "173,694", cal: "3,237 1.9%", ddl: "0 0.0%", color: "bg-blue-500" },
  { brand: "Hoseasons", ccy: "", bookings: "195,900", cal: "0 0.0%", ddl: "0 0.0%", color: "bg-cyan-500" },
  { brand: "Dansommer (DK)", ccy: "EUR", bookings: "383", cal: "1 0.3%", ddl: "0 0.0%", color: "bg-amber-500" },
  { brand: "Dansommer (EUR)", ccy: "", bookings: "569", cal: "0 0.0%", ddl: "0 0.0%", color: "bg-violet-500" },
  { brand: "Fincallorca (EUR)", ccy: "", bookings: "626", cal: "0 0.0%", ddl: "0 0.0%", color: "bg-rose-500" },
  { brand: "JamesVillas", ccy: "", bookings: "563", cal: "0 0.0%", ddl: "0 0.0%", color: "bg-lime-500" },
  { brand: "Novasol (DK)", ccy: "", bookings: "51,369", cal: "4,102 8.0%", ddl: "2 0.0%", color: "bg-pink-500" },
  { brand: "Novasol (EUR)", ccy: "", bookings: "139,932", cal: "6,668 4.8%", ddl: "0 0.0%", color: "bg-orange-500" },
]

export function PartnerBreakdown() {
  const [open, setOpen] = useState(false)

  return (
    <section className="mt-6 rounded-xl border border-border bg-card shadow-xs">
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-sm font-semibold">Partner breakdown</h3>
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
              <TableHead className="text-right">Bookings</TableHead>
              <TableHead className="text-right">CAL</TableHead>
              <TableHead className="text-right">DDL</TableHead>
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
                <TableCell className="text-right tabular-nums">{row.bookings}</TableCell>
                <TableCell className="text-right tabular-nums text-emerald-600 dark:text-emerald-400">
                  {row.cal}
                </TableCell>
                <TableCell className="text-right tabular-nums text-amber-600 dark:text-amber-400">
                  {row.ddl}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </section>
  )
}
