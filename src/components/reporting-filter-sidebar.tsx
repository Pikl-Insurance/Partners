import { useState } from "react"
import { ArrowLeftRight, Check, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type ReportingPeriod = "day" | "week" | "month" | "quarter" | "ytd" | "custom"

export type ReportingFilters = {
  period: ReportingPeriod
  brandA: string
  brandB: string
  compareEnabled: boolean
}

export const DEFAULT_REPORTING_FILTERS: ReportingFilters = {
  period: "month",
  brandA: "brand-a",
  brandB: "brand-b",
  compareEnabled: true,
}

const periodOptions = [
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Quarter", value: "quarter" },
  { label: "YTD", value: "ytd" },
  { label: "Custom", value: "custom" },
] as const

const brandOptions = [
  { label: "Alpha", value: "brand-a" },
  { label: "Beta", value: "brand-b" },
  { label: "Gamma", value: "brand-c" },
] as const

type ReportingFilterSidebarProps = {
  filters: ReportingFilters
  hasRun?: boolean
  onRun: (filters: ReportingFilters) => void
}

export function ReportingFilterSidebar({
  filters,
  hasRun = false,
  onRun,
}: ReportingFilterSidebarProps) {
  const [period, setPeriod] = useState<ReportingPeriod>(filters.period)
  const [brandA, setBrandA] = useState(filters.brandA)
  const [brandB, setBrandB] = useState(filters.brandB)
  const [compareEnabled, setCompareEnabled] = useState(filters.compareEnabled)

  function handleRun() {
    onRun({ period, brandA, brandB, compareEnabled })
  }

  function swapBrands() {
    setBrandA(brandB)
    setBrandB(brandA)
  }

  return (
    <aside className="relative flex min-h-0 flex-col">
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-px bg-border" />

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-6">
        <div>
          <h2 className="text-sm font-semibold">Report filters</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Choose a period and brands, then run the report.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold">Period</h2>
          <div className="grid grid-cols-2 gap-2">
            {periodOptions.map(({ label, value }) => {
              const isActive = period === value
              return (
                <Button
                  key={value}
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start gap-2",
                    isActive &&
                      "border-foreground/40 bg-muted text-foreground hover:bg-muted hover:text-foreground"
                  )}
                  onClick={() => setPeriod(value)}
                >
                  <span className="flex-1 text-left">{label}</span>
                  {isActive ? <Check className="size-3.5 shrink-0" /> : null}
                </Button>
              )
            })}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold">Compare brands</h2>
            <button
              type="button"
              onClick={() => setCompareEnabled((current) => !current)}
              className={cn(
                "rounded-md px-2 py-1 text-[11px] font-medium transition-colors",
                compareEnabled
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {compareEnabled ? "On" : "Off"}
            </button>
          </div>

          <Field>
            <Label htmlFor="report-brand-a">Brand A</Label>
            <Select value={brandA} onValueChange={setBrandA}>
              <SelectTrigger id="report-brand-a">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                {brandOptions.map((brand) => (
                  <SelectItem
                    key={brand.value}
                    value={brand.value}
                    disabled={compareEnabled && brand.value === brandB}
                  >
                    {brand.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {compareEnabled ? (
            <>
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="size-8"
                  onClick={swapBrands}
                  aria-label="Swap brands"
                >
                  <ArrowLeftRight className="size-3.5" />
                </Button>
              </div>

              <Field>
                <Label htmlFor="report-brand-b">Brand B</Label>
                <Select value={brandB} onValueChange={setBrandB}>
                  <SelectTrigger id="report-brand-b">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brandOptions.map((brand) => (
                      <SelectItem
                        key={brand.value}
                        value={brand.value}
                        disabled={brand.value === brandA}
                      >
                        {brand.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </>
          ) : null}
        </div>
      </div>

      <div className="shrink-0 border-t border-border px-6 pb-6 pt-4">
        <Button className="w-full" onClick={handleRun} aria-label="Run report">
          <Play className="size-3.5" />
          {hasRun ? "Run report again" : "Run report"}
        </Button>
      </div>
    </aside>
  )
}
