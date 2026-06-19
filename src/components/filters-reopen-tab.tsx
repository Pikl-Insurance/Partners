import { SlidersHorizontal } from "lucide-react"

type FiltersReopenTabProps = {
  onClick: () => void
}

export function FiltersReopenTab({ onClick }: FiltersReopenTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Show filters"
      className="absolute top-1/2 right-0 z-20 flex -translate-y-1/2 flex-col items-center gap-1.5 rounded-l-lg border border-r-0 border-border bg-card px-2 py-4 shadow-xs transition-colors hover:bg-accent"
    >
      <SlidersHorizontal className="size-3.5 text-muted-foreground" />
      <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase [writing-mode:vertical-rl]">
        Filters
      </span>
    </button>
  )
}
