import { useEffect, useState } from "react"
import { ArrowRight, Layers } from "lucide-react"

import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { label: "Bookings", anchor: "section-bookings" },
  { label: "Avg booking value", anchor: "section-abv" },
  { label: "Cal financials", anchor: "section-cal" },
  { label: "Timing", anchor: "section-timing" },
  { label: "Bookings vs stays", anchor: "section-bookings-vs-stays" },
  { label: "ABV (excl. fees) per day", anchor: "section-abv-per-day" },
  { label: "Avg lead time per day", anchor: "section-lead-time" },
  { label: "Bookings made per day", anchor: "section-bookings-per-day" },
  { label: "CAL & DDL take-up % per day", anchor: "section-cal-ddl-takeup" },
]

type SectionNavProps = {
  collapsed?: boolean
}

export function SectionNav({ collapsed = false }: SectionNavProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (collapsed) {
      setOpen(false)
    }
  }, [collapsed])

  function scrollTo(anchor: string) {
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    setOpen(false)
  }

  return (
    <div className={cn("relative", collapsed ? "w-auto" : "w-full")}>
      {open && (
        <div className="absolute bottom-full left-0 z-50 mb-2 w-max overflow-hidden rounded-xl border border-border bg-card text-foreground shadow-lg">
          <div className="flex items-center gap-2.5 py-3.5 pl-4 pr-6">
            <Layers className="size-3.5 shrink-0 text-muted-foreground" />
            <p className="whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Jump to section
            </p>
          </div>

          <div className="ml-4 mr-6 h-px bg-border" />

          <nav className="flex w-max flex-col py-2">
            {NAV_ITEMS.map(({ label, anchor }) => (
              <button
                key={anchor}
                type="button"
                onClick={() => scrollTo(anchor)}
                className="flex items-center gap-3 whitespace-nowrap py-1.5 pl-4 pr-6 text-left text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <ArrowRight className="size-3 shrink-0 text-muted-foreground" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {collapsed ? (
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle section navigation"
          title="Jump to section"
          className={cn(
            "flex size-9 items-center justify-center rounded-md transition-colors",
            open
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
          )}
        >
          <Layers className="size-4" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle section navigation"
          className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-accent"
        >
          <Layers className="size-4" />
          Jump to section
        </button>
      )}
    </div>
  )
}
