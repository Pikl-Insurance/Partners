import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { WidgetHelpButton } from "@/components/widgets/widget-help-button"

export type DualDataDataset = {
  title: string
  value: string
  clarification: string
}

export type DualDataWidgetProps = {
  primaryTitle: string
  datasetA: DualDataDataset
  datasetB: DualDataDataset
  helpText?: string
}

function DatasetColumn({ title, value, clarification }: DualDataDataset) {
  return (
    <div className="min-w-0">
      <p className="text-sm font-semibold text-muted-foreground">{title}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight tabular-nums text-foreground">
        {value}
      </p>
      <p className="mt-2 text-sm italic text-muted-foreground">{clarification}</p>
    </div>
  )
}

export function DualDataWidget({
  primaryTitle,
  datasetA,
  datasetB,
  helpText,
}: DualDataWidgetProps) {
  return (
    <Card className="bg-muted/30 shadow-xs">
      <CardHeader className="relative items-center pb-4">
        <h3 className="text-sm font-semibold text-muted-foreground">{primaryTitle}</h3>
        <div className="absolute top-4 right-4">
          <WidgetHelpButton title={primaryTitle} helpText={helpText} />
        </div>
      </CardHeader>

      <CardContent className="pb-5">
        <div className="grid grid-cols-2 gap-8">
          <DatasetColumn {...datasetA} />
          <DatasetColumn {...datasetB} />
        </div>
      </CardContent>
    </Card>
  )
}
