import { CircleHelp } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type WidgetHelpButtonProps = {
  title: string
  helpText?: string
}

export function WidgetHelpButton({ title, helpText }: WidgetHelpButtonProps) {
  const icon = (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
      <CircleHelp className="size-3" strokeWidth={2.25} />
    </span>
  )

  if (!helpText) {
    return <span aria-hidden>{icon}</span>
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="transition-colors hover:text-foreground"
          aria-label={`More information about ${title}`}
        >
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent>{helpText}</TooltipContent>
    </Tooltip>
  )
}
