import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { WidgetHelpButton } from "@/components/widgets/widget-help-button"

export type HeadlineDataWidgetProps = {
  title: string
  value: string
  label: string
  helpText?: string
}

export function HeadlineDataWidget({ title, value, label, helpText }: HeadlineDataWidgetProps) {
  return (
    <Card className="bg-muted/30 shadow-xs">
      <CardHeader className="relative items-center justify-center pb-2">
        <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
        <div className="absolute top-4 right-4">
          <WidgetHelpButton title={title} helpText={helpText} />
        </div>
      </CardHeader>

      <CardContent className="pb-5 text-center">
        <p className="text-4xl font-bold tracking-tight tabular-nums text-foreground">{value}</p>
        <p className="mt-2 text-sm italic text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  )
}
