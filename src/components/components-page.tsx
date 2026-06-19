import type { ReactNode } from "react"

import { DualDataWidget } from "@/components/dual-data-widget"
import { BreakdownDataWidget } from "@/components/widgets/breakdown-data-widget"
import { DataSnapshotWidget } from "@/components/widgets/data-snapshot-widget"
import { DualDataListWidget } from "@/components/widgets/dual-data-list-widget"
import { GraphWidget } from "@/components/widgets/graph-widget"
import { HeadlineDataWidget } from "@/components/widgets/headline-data-widget"
import { TooltipProvider } from "@/components/ui/tooltip"

const graphSampleData = [
  { label: "Value", layer1: 12, layer2: 8, layer3: 4 },
  { label: "Value", layer1: 18, layer2: 11, layer3: 6 },
  { label: "Value", layer1: 24, layer2: 15, layer3: 9 },
  { label: "Value", layer1: 31, layer2: 19, layer3: 11 },
  { label: "Value", layer1: 38, layer2: 23, layer3: 13 },
  { label: "Value", layer1: 46, layer2: 28, layer3: 15 },
]

const snapshotRows = Array.from({ length: 6 }, (_, index) => ({
  label: "Data Label",
  value: `${(index + 1) * 1240}`,
}))

function ComponentSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

export function ComponentsPage() {
  return (
    <TooltipProvider>
      <div className="space-y-10">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight">Components</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Shared UI components built with Tailwind and ShadCN.
          </p>
        </div>

        <ComponentSection
          title="Headline Data widget"
          description="Single headline metric with a title, value, and supporting label."
        >
          <div className="max-w-sm">
            <HeadlineDataWidget
              title="Widget Title"
              value="128,450"
              label="Data Label"
              helpText="Supporting context for this headline metric."
            />
          </div>
        </ComponentSection>

        <ComponentSection
          title="Dual Data widget"
          description="Side-by-side metrics with a shared title and optional help tooltip."
        >
          <div className="max-w-xl">
            <DualDataWidget
              primaryTitle="Widget title"
              datasetA={{
                title: "Dataset A",
                value: "42,310",
                clarification: "Clarification",
              }}
              datasetB={{
                title: "Dataset B",
                value: "38,750",
                clarification: "Clarification",
              }}
              helpText="Additional context about this widget and its datasets."
            />
          </div>
        </ComponentSection>

        <ComponentSection
          title="Dual Data List widget"
          description="Stacked label and value rows beneath a shared widget title."
        >
          <div className="max-w-md">
            <DualDataListWidget
              title="Widget Title"
              rows={[
                { label: "Data Label", value: "42,310" },
                { label: "Data Label", value: "38,750" },
              ]}
              helpText="Each row can represent a separate metric or breakdown item."
            />
          </div>
        </ComponentSection>

        <ComponentSection
          title="Breakdown Data widget"
          description="Primary metric with two supporting subdata values."
        >
          <div className="max-w-2xl">
            <BreakdownDataWidget
              title="Widget Title"
              primaryValue="94,200"
              primaryLabel="Data Label"
              subdataA={{
                label: "Sub Data Label",
                value: "12,480",
                helpText: "Context for the first subdata value.",
              }}
              subdataB={{
                label: "Sub Data Label",
                value: "8,920",
              }}
            />
          </div>
        </ComponentSection>

        <ComponentSection
          title="Data Snapshot widget"
          description="Scrollable list of label and value pairs with an overview link."
        >
          <div className="max-w-md">
            <DataSnapshotWidget title="Widget Title" rows={snapshotRows} />
          </div>
        </ComponentSection>

        <ComponentSection
          title="Graph widget"
          description="Line chart with toggleable data layers."
        >
          <div className="max-w-3xl">
            <GraphWidget
              title="Widget Title"
              explanation="Graph Explanation"
              xAxisKey="label"
              layers={[
                { id: "layer-1", label: "Data Layer 1", color: "#2563eb", dataKey: "layer1" },
                { id: "layer-2", label: "Data Layer 2", color: "#dc2626", dataKey: "layer2" },
                { id: "layer-3", label: "Data Layer 3", color: "#71717a", dataKey: "layer3" },
              ]}
              data={graphSampleData}
            />
          </div>
        </ComponentSection>
      </div>
    </TooltipProvider>
  )
}
