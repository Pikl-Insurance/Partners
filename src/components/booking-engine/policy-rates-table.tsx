import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  formatCurrency,
  formatRate,
  type PolicyRate,
} from "@/lib/booking-engine-data"
import { cn } from "@/lib/utils"

type PolicyRatesTableProps = {
  policies: PolicyRate[]
  selectedBrandId: string | null
  compact?: boolean
  /** Renders at natural height for a parent with overflow-hidden (no scroll wrappers). */
  clipped?: boolean
}

export function PolicyRatesTable({
  policies,
  selectedBrandId,
  compact = false,
  clipped = false,
}: PolicyRatesTableProps) {
  const tableContent = (
    <>
      <TableHeader>
        <TableRow className="bg-card hover:bg-card dark:bg-card dark:hover:bg-card">
          <TableHead className={cn(compact ? "h-8 px-3 text-xs" : "h-12 px-5")}>
            Name / valid dates
          </TableHead>
          <TableHead className={cn("text-right", compact ? "h-8 px-3 text-xs" : "px-5")}>
            Net rate
          </TableHead>
          <TableHead className={cn("text-right", compact ? "h-8 px-3 text-xs" : "px-5")}>
            Gross rate
          </TableHead>
          <TableHead className={cn("text-right", compact ? "h-8 px-3 text-xs" : "px-5")}>
            CAL commission
          </TableHead>
          <TableHead className={cn("text-right", compact ? "h-8 px-3 text-xs" : "px-5")}>
            Max liability
          </TableHead>
          <TableHead className={cn(compact ? "h-8 px-3 text-xs" : "px-5")}>Currency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {policies.map((policy) => {
          const isHighlighted = selectedBrandId === policy.brandId
          const isActive = policy.status === "active"

          return (
            <TableRow
              key={policy.id}
              className={cn(isHighlighted && "bg-muted/40")}
            >
              <TableCell className={cn(compact ? "px-3 py-2" : "px-5 py-4")}>
                <div className="flex items-start gap-2">
                  <span
                    className={cn(
                      "shrink-0 rounded-full",
                      compact ? "mt-1 size-1.5" : "mt-1.5 size-2",
                      isActive ? "bg-primary" : "bg-muted-foreground/40"
                    )}
                  />
                  <div className="min-w-0">
                    <p
                      className={cn(
                        compact ? "text-xs" : "font-medium text-foreground",
                        !isActive && "font-normal text-muted-foreground",
                        isActive && !compact && "font-medium text-foreground"
                      )}
                    >
                      {policy.name}
                    </p>
                    <p className={cn("text-muted-foreground", compact ? "text-[11px]" : "text-xs")}>
                      {policy.validFrom} – {policy.validTo}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-mono tabular-nums text-foreground",
                  compact ? "px-3 py-2 text-xs" : "px-5 py-4 text-sm"
                )}
              >
                {formatRate(policy.netRate)}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-mono tabular-nums text-foreground",
                  compact ? "px-3 py-2 text-xs" : "px-5 py-4 text-sm"
                )}
              >
                {formatRate(policy.grossRate)}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-mono tabular-nums text-foreground",
                  compact ? "px-3 py-2 text-xs" : "px-5 py-4 text-sm"
                )}
              >
                {policy.calCommission > 0 ? `${formatRate(policy.calCommission)}%` : "—"}
              </TableCell>
              <TableCell
                className={cn(
                  "text-right font-mono tabular-nums text-foreground",
                  compact ? "px-3 py-2 text-xs" : "px-5 py-4 text-sm"
                )}
              >
                {formatCurrency(policy.maxLiability, policy.currency)}
              </TableCell>
              <TableCell className={cn(compact ? "px-3 py-2 text-xs" : "px-5 py-4 text-sm")}>
                {policy.currency}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </>
  )

  if (clipped) {
    return (
      <table className="w-full caption-bottom text-sm">{tableContent}</table>
    )
  }

  return (
    <div className={cn("overflow-hidden", !compact && "rounded-lg border border-border")}>
      <Table>{tableContent}</Table>
    </div>
  )
}
