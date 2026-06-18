import { Play } from "lucide-react"

import { CompareFilterPanel } from "@/components/compare/compare-filter-panel"
import { Button } from "@/components/ui/button"
import type { CompareSideFilters } from "@/lib/compare-data"

type CompareHeaderProps = {
  primaryDraft: CompareSideFilters
  comparisonDraft: CompareSideFilters
  onPrimaryChange: (filters: CompareSideFilters) => void
  onComparisonChange: (filters: CompareSideFilters) => void
  onRun: () => void
}

export function CompareHeader({
  primaryDraft,
  comparisonDraft,
  onPrimaryChange,
  onComparisonChange,
  onRun,
}: CompareHeaderProps) {
  return (
    <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      <CompareFilterPanel
        variant="primary"
        filters={primaryDraft}
        onChange={onPrimaryChange}
        disablePartnerId={comparisonDraft.partner}
      />

      <div className="flex flex-col items-center justify-center gap-3 px-2 py-6">
        <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          vs
        </span>
        <Button className="min-w-44" onClick={onRun}>
          <Play className="size-3.5" />
          Run comparison
        </Button>
      </div>

      <CompareFilterPanel
        variant="comparison"
        filters={comparisonDraft}
        onChange={onComparisonChange}
        disablePartnerId={primaryDraft.partner}
      />
    </div>
  )
}
