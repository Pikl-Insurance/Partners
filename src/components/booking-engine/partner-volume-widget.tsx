import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { DualDataDataset } from "@/components/dual-data-widget"

type PartnerVolumeWidgetProps = {
  productSplit: {
    datasetA: DualDataDataset
    datasetB: DualDataDataset
  }
  volume: {
    datasetA: DualDataDataset
    datasetB: DualDataDataset
  }
  className?: string
}

function MetricRow({ datasetA, datasetB }: { datasetA: DualDataDataset; datasetB: DualDataDataset }) {
  return (
    <div className="flex min-w-0 items-stretch">
      <div className="min-w-0 flex-1 pr-3">
        <p className="truncate text-xs font-semibold text-muted-foreground">{datasetA.title}</p>
        <p className="mt-1 text-lg font-bold tracking-tight tabular-nums text-foreground">
          {datasetA.value}
        </p>
        <p className="mt-1 truncate text-[11px] italic text-muted-foreground">{datasetA.clarification}</p>
      </div>
      <div aria-hidden className="w-px shrink-0 self-stretch bg-border" />
      <div className="min-w-0 flex-1 pl-3">
        <p className="truncate text-xs font-semibold text-muted-foreground">{datasetB.title}</p>
        <p className="mt-1 text-lg font-bold tracking-tight tabular-nums text-foreground">
          {datasetB.value}
        </p>
        <p className="mt-1 truncate text-[11px] italic text-muted-foreground">{datasetB.clarification}</p>
      </div>
    </div>
  )
}

export function PartnerVolumeWidget({
  productSplit,
  volume,
  className,
}: PartnerVolumeWidgetProps) {
  return (
    <Card className={cn("flex h-full min-w-0 flex-col bg-card shadow-xs", className)}>
      <CardContent className="flex flex-col gap-4 pb-5 pt-5">
        <MetricRow {...volume} />
        <div className="border-t border-border pt-4">
          <MetricRow {...productSplit} />
        </div>
      </CardContent>
    </Card>
  )
}
