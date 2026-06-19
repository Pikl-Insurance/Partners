import { useMemo, useState } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const TICK_STYLE = { fontSize: 11, fill: "var(--color-muted-foreground)" }

export type GraphLayer = {
  id: string
  label: string
  color: string
  dataKey: string
}

export type GraphWidgetProps = {
  title: string
  explanation: string
  layers: GraphLayer[]
  data: Record<string, string | number>[]
  xAxisKey: string
  className?: string
}

export function GraphWidget({
  title,
  explanation,
  layers,
  data,
  xAxisKey,
  className,
}: GraphWidgetProps) {
  const [activeLayerIds, setActiveLayerIds] = useState(() => new Set(layers.map((layer) => layer.id)))

  const visibleLayers = useMemo(
    () => layers.filter((layer) => activeLayerIds.has(layer.id)),
    [activeLayerIds, layers]
  )

  function toggleLayer(layerId: string) {
    setActiveLayerIds((current) => {
      const next = new Set(current)
      if (next.has(layerId)) {
        next.delete(layerId)
      } else {
        next.add(layerId)
      }
      return next
    })
  }

  return (
    <Card className={cn("bg-muted/30 shadow-xs", className)}>
      <CardHeader className="flex-col items-start gap-1 pb-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{explanation}</p>
      </CardHeader>

      <CardContent className="space-y-4 pb-5">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey={xAxisKey}
                tick={TICK_STYLE}
                tickLine={false}
                axisLine={false}
              />
              <YAxis tick={TICK_STYLE} tickLine={false} axisLine={false} width={40} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "0.5rem",
                  fontSize: 12,
                }}
              />
              {visibleLayers.map((layer) => (
                <Line
                  key={layer.id}
                  type="monotone"
                  dataKey={layer.dataKey}
                  name={layer.label}
                  stroke={layer.color}
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {layers.map((layer) => {
            const isActive = activeLayerIds.has(layer.id)

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => toggleLayer(layer.id)}
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive ? "hover:opacity-80" : "text-muted-foreground hover:text-foreground"
                )}
                style={isActive ? { color: layer.color } : undefined}
              >
                {isActive ? `Deactivate ${layer.label}` : `Activate ${layer.label}`}
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
