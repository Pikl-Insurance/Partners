import { useState } from "react"
import { Camera } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { buildSnapshotFilename, exportElementSnapshot } from "@/lib/export-snapshot"
import type { ActiveFilters } from "@/lib/chart-data"

type ExportSnapshotButtonProps = {
  getTarget: () => HTMLElement | null
  exportSlug: string
  filters?: ActiveFilters
}

export function ExportSnapshotButton({
  getTarget,
  exportSlug,
  filters,
}: ExportSnapshotButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  async function handleExport() {
    const target = getTarget()
    if (!target || isExporting) return

    setIsExporting(true)
    try {
      await exportElementSnapshot(target, buildSnapshotFilename(exportSlug, filters))
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            disabled={isExporting}
            aria-label="Export snapshot for report"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50"
            onClick={handleExport}
          >
            <Camera className="size-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Export snapshot for report</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
