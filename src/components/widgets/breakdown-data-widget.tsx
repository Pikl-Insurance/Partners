import { Card, CardContent } from "@/components/ui/card"
import { WidgetHelpButton } from "@/components/widgets/widget-help-button"

export type BreakdownSubdata = {
  label: string
  value: string
  helpText?: string
}

export type BreakdownDataWidgetProps = {
  title: string
  primaryValue: string
  primaryLabel: string
  subdataA: BreakdownSubdata
  subdataB: BreakdownSubdata
}

function SubdataBlock({ label, value, helpText }: BreakdownSubdata) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">{label}</p>
        {helpText ? <WidgetHelpButton title={label} helpText={helpText} /> : null}
      </div>
      <p className="mt-1 text-lg font-bold tabular-nums text-foreground">{value}</p>
    </div>
  )
}

export function BreakdownDataWidget({
  title,
  primaryValue,
  primaryLabel,
  subdataA,
  subdataB,
}: BreakdownDataWidgetProps) {
  return (
    <Card className="bg-muted/30 shadow-xs">
      <CardContent className="grid gap-6 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="min-w-0 text-center sm:text-left">
          <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
          <p className="mt-3 text-4xl font-bold tracking-tight tabular-nums text-foreground">
            {primaryValue}
          </p>
          <p className="mt-2 text-sm italic text-muted-foreground">{primaryLabel}</p>
        </div>

        <div className="flex flex-col justify-center gap-5 border-border sm:border-l sm:pl-6">
          <SubdataBlock {...subdataA} />
          <SubdataBlock {...subdataB} />
        </div>
      </CardContent>
    </Card>
  )
}
