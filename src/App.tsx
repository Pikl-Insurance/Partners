import { useEffect, useState } from "react"
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  LayoutDashboard,
  MoonStar,
  Mountain,
  ShieldCheck,
  Sun,
} from "lucide-react"

import { FilterSidebar } from "@/components/filter-sidebar"
import { AverageBookingValueBreakdown } from "@/components/average-booking-value-breakdown"
import { AverageBookingValueSnapshot } from "@/components/average-booking-value-snapshot"
import { BookingsSnapshot } from "@/components/bookings-snapshot"
import { CalFinancials } from "@/components/cal-financials"
import { PartnerBreakdown } from "@/components/partner-breakdown"
import { TimingBreakdown } from "@/components/timing-breakdown"
import { TimingSnapshot } from "@/components/timing-snapshot"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Insights", icon: BarChart3, active: true },
  { label: "Admin", icon: ShieldCheck },
]

function App() {
  const [isDark, setIsDark] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <div
        className={cn(
          "grid h-full transition-[grid-template-columns] duration-200",
          leftSidebarOpen ? "grid-cols-[230px_1fr]" : "grid-cols-[20px_1fr]"
        )}
      >
        <aside className="relative flex h-full flex-col border-r border-border bg-card">
          <button
            type="button"
            aria-label={leftSidebarOpen ? "Collapse left sidebar" : "Expand left sidebar"}
            onClick={() => setLeftSidebarOpen((prev) => !prev)}
            className="absolute top-1/2 right-0 z-20 flex h-16 w-5 translate-x-full -translate-y-1/2 items-center justify-center rounded-r-md border border-l-0 border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            {leftSidebarOpen ? (
              <ChevronLeft className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>

          <div className={cn("px-6 pb-6", !leftSidebarOpen && "hidden")}>
            <div className="flex h-16 shrink-0 items-center gap-2 border-b border-border">
              <div className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground">
                <Mountain className="size-4" />
              </div>
              <span className="text-lg font-semibold">Keystone</span>
            </div>

            <nav className="mt-6 space-y-2">
              {navItems.map(({ label, icon: Icon, active }) => (
                <a
                  key={label}
                  href="#"
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex h-full min-w-0 flex-col overflow-hidden">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Keystone</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Insights</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Sales metrics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsDark((value) => !value)}
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="size-4" /> : <MoonStar className="size-4" />}
              </Button>
              <Button variant="outline" size="default">
                Logout
              </Button>
            </div>
          </header>

          <div
            className={cn(
              "grid min-h-0 flex-1 transition-[grid-template-columns] duration-200",
              rightSidebarOpen ? "grid-cols-[1fr_320px]" : "grid-cols-[1fr_20px]"
            )}
          >
            <section className="min-w-0 overflow-y-auto bg-canvas px-20 py-12 xl:px-24 xl:py-14">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Sales, cancellation &amp; re-let metrics
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Real-time across 3 partners
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="outline">
                    <Calendar className="size-4" />
                    Schedule report
                  </Button>
                  <Button variant="outline">
                    <ArrowUpRight className="size-4" />
                    Compare
                  </Button>
                  <Button>
                    <Download className="size-4" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="space-y-6 rounded-2xl border border-border/80 bg-muted/30 p-6">
                <BookingsSnapshot />
                <PartnerBreakdown />
              </div>

              <div className="mt-8 space-y-6 rounded-2xl border border-border/80 bg-muted/30 p-6">
                <AverageBookingValueSnapshot />
                <AverageBookingValueBreakdown />
              </div>

              <div className="mt-8 space-y-6 rounded-2xl border border-border/80 bg-muted/30 p-6">
                <CalFinancials />
              </div>

              <div className="mt-8 space-y-6 rounded-2xl border border-border/80 bg-muted/30 p-6">
                <TimingSnapshot />
                <TimingBreakdown />
              </div>
            </section>

            <FilterSidebar
              open={rightSidebarOpen}
              onToggle={() => setRightSidebarOpen((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
