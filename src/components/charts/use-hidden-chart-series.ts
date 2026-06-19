import { useCallback, useState } from "react"

export function useHiddenChartSeries(seriesKeys: string[]) {
  const [hiddenKeys, setHiddenKeys] = useState<Set<string>>(() => new Set())

  const toggleSeries = useCallback(
    (key: string) => {
      setHiddenKeys((current) => {
        const next = new Set(current)
        if (next.has(key)) {
          next.delete(key)
          return next
        }

        const visibleCount = seriesKeys.filter((seriesKey) => !current.has(seriesKey)).length
        if (visibleCount <= 1) {
          return current
        }

        next.add(key)
        return next
      })
    },
    [seriesKeys]
  )

  const isHidden = useCallback((key: string) => hiddenKeys.has(key), [hiddenKeys])

  return { hiddenKeys, toggleSeries, isHidden }
}
