import { useState } from "react"
import { ArrowRight, Layers, MapPin } from "lucide-react"

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

export function SectionNav() {
  const [open, setOpen] = useState(false)

  function scrollTo(anchor: string) {
    const el = document.getElementById(anchor)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="px-4 pb-6">
      {open && (
        <div className="mb-2 overflow-hidden rounded-xl border border-border bg-card text-foreground shadow-xs dark:border-transparent dark:bg-[oklch(0.13_0_0)] dark:text-[oklch(0.95_0_0)] dark:shadow-md">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4 py-3.5">
            <Layers className="size-3.5 shrink-0 text-muted-foreground dark:opacity-70 dark:text-current" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground dark:opacity-80 dark:text-current">
              Jump to section
            </p>
          </div>

          {/* Divider */}
          <div className="mx-4 h-px bg-border dark:bg-[oklch(1_0_0_/_15%)]" />

          {/* Links */}
          <nav className="py-2">
            {NAV_ITEMS.map(({ label, anchor }) => (
              <button
                key={anchor}
                type="button"
                onClick={() => scrollTo(anchor)}
                className="flex w-full items-center gap-3 px-4 py-1.5 text-left text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground dark:text-[oklch(0.95_0_0)] dark:hover:bg-transparent dark:hover:opacity-60"
              >
                <ArrowRight className="size-3 shrink-0 text-muted-foreground dark:opacity-50 dark:text-current" />
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle section navigation"
        className="flex h-9 w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-medium transition-colors hover:bg-accent"
      >
        <MapPin className="size-4" />
        Jump to section
      </button>
    </div>
  )
}
