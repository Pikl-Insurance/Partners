import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { WidgetHelpButton } from "@/components/widgets/widget-help-button"

export type HeadlineDataWidgetProps = {
  title: string
  value: string
  label: string
  helpText?: string
  valueClassName?: string
}

export function HeadlineDataWidget({
  title,
  value,
  label,
  helpText,
  valueClassName,
}: HeadlineDataWidgetProps) {
  return (
    <Card className="@container flex h-full min-w-0 flex-col bg-card shadow-xs">
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-0">
        <h3 className="min-w-0 pr-2 text-sm font-semibold text-muted-foreground">{title}</h3>
        <WidgetHelpButton title={title} helpText={helpText} />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col pb-5">
        <div className="flex flex-1 items-center">
          <p
            className={cn(
              "font-bold tracking-tight tabular-nums text-foreground",
              valueClassName ?? "text-3xl @sm:text-4xl"
            )}
          >
            {value}
          </p>
        </div>
        <p className="text-xs italic text-muted-foreground @sm:text-sm">{label}</p>
      </CardContent>
    </Card>
  )
}
