import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { WidgetHelpButton } from "@/components/widgets/widget-help-button"

export type DualDataListRow = {
  label: string
  value: string
}

export type DualDataListWidgetProps = {
  title: string
  rows: DualDataListRow[]
  helpText?: string
}

export function DualDataListWidget({ title, rows, helpText }: DualDataListWidgetProps) {
  return (
    <Card className="bg-muted/30 shadow-xs">
      <CardHeader className="relative items-center justify-center pb-4">
        <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
        <div className="absolute top-4 right-4">
          <WidgetHelpButton title={title} helpText={helpText} />
        </div>
      </CardHeader>

      <CardContent className="space-y-0 pb-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0"
          >
            <span className="text-sm italic text-muted-foreground">{row.label}</span>
            <span className="text-sm font-bold tabular-nums text-foreground">{row.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
