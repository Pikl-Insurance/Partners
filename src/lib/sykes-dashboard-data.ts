export const SYKES_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const

export const PHASING_BANNER_TITLE =
  "Phasing of Margin earned from Flexible Cancellation; When people are travelling; cancellation/relet rate"

export const PARTNER_REVENUE = {
  headline: "£1.8m",
  headlineNote: "(net of insurance premium rate + IPT)",
  drivers: [
    { label: "Attachment (Average)", value: "14%" },
    { label: "Margin (ex. VAT) £m", value: "£900k" },
    { label: "Incremental Cancellations & Relets", value: "£100k" },
    {
      label: "Website Conversion*",
      value: "£800k p/a",
    },
    { label: "Total", value: "£1,800k", highlight: true },
  ],
} as const

export const ADDITIONAL_PARTNER_REVENUE = {
  headline: "£1.2m",
  drivers: [
    {
      label: "Gross Bookings",
      value: "690k",
      trend: "+500",
      side: "65% % Product available",
    },
    {
      label: "Average Lead Time v Non-FC",
      value: "125 Days",
      trend: "+15",
      side: "£100k est. value",
    },
    {
      label: "Average Length of Stay v Non-FC",
      value: "6.1 Days",
      trend: "+0.5",
      side: "£100k est. value",
    },
    {
      label: "Average Customer Spend per Booking v Non-FC",
      value: "£899",
      trend: "+3",
      side: "£100k est. value",
    },
    {
      label: "Average Pikl'd Stay IPB",
      value: "£4.0",
      trend: "+1",
      side: "£100k est. value",
    },
  ],
} as const

export const GROSS_BOOKINGS_TREND = [
  { label: "Jan", value: 520 },
  { label: "Feb", value: 545 },
  { label: "Mar", value: 580 },
  { label: "Apr", value: 610 },
  { label: "May", value: 640 },
  { label: "Jun", value: 690 },
] as const

export const MARKET_COMPARISON_METRICS = [
  "Cancellation Rate",
  "Rebookability Rate",
  "Rebookability Average value",
  "Average Lead Time",
  "Average Length of Stay",
] as const

/** Partner vs market mock figures — same measures, filled values. */
export const MARKET_COMPARISON_VALUES = [
  { metric: "Cancellation Rate", value: "8.3%", trend: "-0.6pp", tone: "up" as const, side: "Market 8.9%" },
  { metric: "Rebookability Rate", value: "58%", trend: "+2.1pp", tone: "up" as const, side: "Market 55%" },
  { metric: "Rebookability Average value", value: "£830", trend: "+£40", tone: "up" as const, side: "Market £790" },
  { metric: "Average Lead Time", value: "125 days", trend: "+15", tone: "up" as const, side: "Market 110 days" },
  { metric: "Average Length of Stay", value: "6.1 days", trend: "+0.5", tone: "up" as const, side: "Market 5.6 days" },
] as const

export const TOTAL_PRODUCTS_SUMMARY = [
  { label: "Total Bookings", value: "690k", trend: "+500", tone: "up" as const },
  { label: "% of Bookings that are offered a product", value: "65%", trend: "+2.1pp", tone: "up" as const },
  { label: "Total Bookings offered a Product", value: "448,500", trend: "+12.4k", tone: "up" as const },
  { label: "Total Margin Earned", value: "800k", trend: "+£40k", tone: "up" as const },
  { label: "Income per Booking Achieved", value: "4.01", trend: "+0.18", tone: "up" as const },
] as const

export type ChannelCellVariant =
  | "channel"
  | "volume"
  | "attachment"
  | "rate"
  | "direct"
  | "total"
  | "empty"

export type ChannelGridCell = {
  value: string
  variant: ChannelCellVariant
}

export type ChannelGridRow = {
  label: string
  website: ChannelGridCell
  app: ChannelGridCell
  offline: ChannelGridCell
  ota: ChannelGridCell
  direct: ChannelGridCell
  total: ChannelGridCell
}

type ChannelValues = {
  website: number
  app: number
  offline: number
  ota: number
}

function formatCount(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}k`
  return value.toLocaleString("en-GB")
}

function formatMoney(value: number): string {
  if (Math.abs(value) >= 1000) {
    const thousands = value / 1000
    const rounded = Number.isInteger(thousands) ? String(thousands) : thousands.toFixed(1)
    return `£${rounded}k`
  }
  return `£${value.toLocaleString("en-GB")}`
}

function formatPercent(value: number): string {
  return `${Number.isInteger(value) ? value : value.toFixed(1)}%`
}

function formatDays(value: number): string {
  return `${Number.isInteger(value) ? value : value.toFixed(1)} days`
}

function formatCurrency(value: number): string {
  return `£${value.toLocaleString("en-GB")}`
}

function sumChannels({ website, app, offline, ota }: ChannelValues) {
  const direct = website + app + offline
  const total = direct + ota
  return { website, app, offline, ota, direct, total }
}

function volumeRow(label: string, values: ChannelValues): ChannelGridRow {
  const summed = sumChannels(values)
  return {
    label,
    website: { value: formatCount(summed.website), variant: "volume" },
    app: { value: formatCount(summed.app), variant: "volume" },
    offline: { value: formatCount(summed.offline), variant: "volume" },
    ota: { value: formatCount(summed.ota), variant: "volume" },
    direct: { value: formatCount(summed.direct), variant: "direct" },
    total: { value: formatCount(summed.total), variant: "total" },
  }
}

function moneyRow(label: string, values: ChannelValues): ChannelGridRow {
  const summed = sumChannels(values)
  return {
    label,
    website: { value: formatMoney(summed.website), variant: "channel" },
    app: { value: formatMoney(summed.app), variant: "channel" },
    offline: { value: formatMoney(summed.offline), variant: "channel" },
    ota: { value: formatMoney(summed.ota), variant: "channel" },
    direct: { value: formatMoney(summed.direct), variant: "direct" },
    total: { value: formatMoney(summed.total), variant: "total" },
  }
}

function attachmentRow(
  label: string,
  channels: ChannelValues,
  direct: number,
  total: number
): ChannelGridRow {
  return {
    label,
    website: { value: formatPercent(channels.website), variant: "attachment" },
    app: { value: formatPercent(channels.app), variant: "attachment" },
    offline: { value: formatPercent(channels.offline), variant: "attachment" },
    ota: { value: formatPercent(channels.ota), variant: "attachment" },
    direct: { value: formatPercent(direct), variant: "direct" },
    total: { value: formatPercent(total), variant: "total" },
  }
}

function flatRateRow(label: string, value: string): ChannelGridRow {
  const channelCell = (): ChannelGridCell => ({ value, variant: "rate" })
  return {
    label,
    website: channelCell(),
    app: channelCell(),
    offline: channelCell(),
    ota: channelCell(),
    direct: { value, variant: "direct" },
    total: { value, variant: "total" },
  }
}

function metricRow(
  label: string,
  channels: ChannelValues,
  direct: number,
  total: number,
  format: (value: number) => string
): ChannelGridRow {
  return {
    label,
    website: { value: format(channels.website), variant: "channel" },
    app: { value: format(channels.app), variant: "channel" },
    offline: { value: format(channels.offline), variant: "channel" },
    ota: { value: format(channels.ota), variant: "channel" },
    direct: { value: format(direct), variant: "direct" },
    total: { value: format(total), variant: "total" },
  }
}
/**
 * Channel mock figures are derived so Direct = Website+App+Offline and Total = Direct+OTA.
 * Anchors from partner summaries: 690k bookings, 14% attachment, £900k FC margin, £100k incremental benefit.
 */
export const FLEXIBLE_CANCELLATION_GRID: ChannelGridRow[] = [
  // 14% of 690k ≈ 96.6k FC bookings
  volumeRow("FC Bookings", { website: 48300, app: 19320, offline: 9660, ota: 19320 }),
  attachmentRow("FC Attachment", { website: 16, app: 12, offline: 8, ota: 11 }, 14.5, 14),
  flatRateRow("FC Guest Price Avg %", "10%"),
  flatRateRow("FC Insurance Premium Rate Avg %", "6.35%"),
  // Aligns to PARTNER_REVENUE Margin (ex. VAT) £900k
  moneyRow("FC Partner Margin £", { website: 520000, app: 180000, offline: 80000, ota: 120000 }),
  // Aligns to PARTNER_REVENUE Incremental Cancellations & Relets £100k
  moneyRow("Commission and Booking Fee Benefit from Incremental Cancellations", {
    website: 55000,
    app: 20000,
    offline: 10000,
    ota: 15000,
  }),
  {
    label: "Out of Test Conversion Benefit (1% = £900,000)",
    website: { value: "1.0%", variant: "rate" },
    app: { value: "N/A", variant: "empty" },
    offline: { value: "N/A", variant: "empty" },
    ota: { value: "N/A", variant: "empty" },
    direct: { value: "£900k", variant: "direct" },
    total: { value: "£900k", variant: "total" },
  },
]

export const DAMAGE_DEPOSIT_WAIVER_GRID: ChannelGridRow[] = [
  volumeRow("DDL Bookings", { website: 22000, app: 8000, offline: 4000, ota: 6000 }),
  attachmentRow("DDL Attachment", { website: 8, app: 6, offline: 4, ota: 5 }, 7, 6.8),
  flatRateRow("DDL Guest Price Avg %", "£30"),
  flatRateRow("DDL Insurance Premium Rate Avg%", "2.12%"),
  moneyRow("DDL Partner Margin £", { website: 180000, app: 60000, offline: 30000, ota: 40000 }),
  {
    label: "Out of Test Conversion Benefit",
    website: { value: "0.4%", variant: "attachment" },
    app: { value: "N/A", variant: "empty" },
    offline: { value: "N/A", variant: "empty" },
    ota: { value: "N/A", variant: "empty" },
    direct: { value: "£180k", variant: "direct" },
    total: { value: "£180k", variant: "total" },
  },
]

/**
 * Contribution to performance — channel grid matching the partner wireframe.
 * Direct = Website+App+Offline; Total = Direct+OTA. FC rows are Flexible Cancellation.
 */
export const CONTRIBUTION_TO_PERFORMANCE_GRID: ChannelGridRow[] = [
  volumeRow("Cancellation Volume", { website: 4200, app: 1600, offline: 800, ota: 1400 }),
  attachmentRow("Cancellation Avg %", { website: 8.7, app: 8.3, offline: 8.3, ota: 7.2 }, 8.6, 8.3),
  volumeRow("Cancellation Volume FC", { website: 2900, app: 1100, offline: 550, ota: 950 }),
  attachmentRow("Cancellation % Avg FC", { website: 6.0, app: 5.7, offline: 5.7, ota: 4.9 }, 5.9, 5.7),
  volumeRow("Relet Volume", { website: 1740, app: 660, offline: 330, ota: 570 }),
  attachmentRow("Re-let % Avg", { website: 60, app: 60, offline: 60, ota: 60 }, 60, 60),
  metricRow(
    "Re-Let Value Avg",
    { website: 820, app: 790, offline: 760, ota: 740 },
    805,
    790,
    formatCurrency
  ),
  volumeRow("Re-Let Volume FC", { website: 1450, app: 550, offline: 275, ota: 475 }),
  attachmentRow("Re-let % FC Avg", { website: 50, app: 50, offline: 50, ota: 50 }, 50, 50),
  metricRow(
    "Re-Let Value FC Avg",
    { website: 860, app: 830, offline: 800, ota: 780 },
    845,
    830,
    formatCurrency
  ),
  metricRow(
    "Average Length of Booking",
    { website: 5.6, app: 5.4, offline: 5.8, ota: 5.2 },
    5.6,
    5.5,
    formatDays
  ),
  metricRow(
    "Average Length of Booking FC",
    { website: 6.2, app: 6.0, offline: 6.4, ota: 5.8 },
    6.2,
    6.1,
    formatDays
  ),
  metricRow(
    "Average Lead time between Booking and Travel",
    { website: 110, app: 105, offline: 118, ota: 98 },
    110,
    108,
    formatDays
  ),
  metricRow(
    "Average Lead time between Booking and Travel FC",
    { website: 128, app: 122, offline: 135, ota: 115 },
    127,
    125,
    formatDays
  ),
  metricRow(
    "Average Holiday Value Per Booking £",
    { website: 920, app: 880, offline: 860, ota: 840 },
    900,
    890,
    formatCurrency
  ),
  metricRow(
    "Average Holiday Value Per Booking with FC £",
    { website: 940, app: 900, offline: 880, ota: 860 },
    920,
    910,
    formatCurrency
  ),
  metricRow(
    "Average Lead time between Booking and Cancellation",
    { website: 42, app: 38, offline: 45, ota: 36 },
    41,
    40,
    formatDays
  ),
  metricRow(
    "Average Lead time between Booking and Cancellation FC",
    { website: 48, app: 44, offline: 52, ota: 40 },
    47,
    46,
    formatDays
  ),
  metricRow(
    "Average Lead time between Cancellation and Relet",
    { website: 12, app: 11, offline: 14, ota: 10 },
    12,
    12,
    formatDays
  ),
  metricRow(
    "Average Lead time between Cancellation and Relet FC",
    { website: 10, app: 9, offline: 12, ota: 8 },
    10,
    10,
    formatDays
  ),
]

/** Alias kept for the full Sykes dashboard — same rows as contribution (FC + behaviour). */
export const PERFORMANCE_METRICS_GRID: ChannelGridRow[] =
  CONTRIBUTION_TO_PERFORMANCE_GRID.slice(2)

export const FINANCIALS_GRID: ChannelGridRow[] = [
  moneyRow("Insurance Premium Paid £", { website: 310000, app: 110000, offline: 50000, ota: 80000 }),
  moneyRow("Claims Made £", { website: 62000, app: 22000, offline: 10000, ota: 16000 }),
  moneyRow("Re-Let Rental Charges Paid to Insurer £", {
    website: 48000,
    app: 17000,
    offline: 8000,
    ota: 12000,
  }),
  moneyRow("Re-Let Rental Charges Potential (Paid and Potential) £", {
    website: 72000,
    app: 25000,
    offline: 12000,
    ota: 18000,
  }),
  attachmentRow("Loss Ratio % on Paid Re-Let", { website: 15.5, app: 15.5, offline: 16, ota: 15 }, 15.6, 15.5),
  attachmentRow(
    "Loss Ratio % on Re-Let Potential (Paid and Potential)",
    { website: 23.2, app: 22.7, offline: 24, ota: 22.5 },
    23.2,
    23.0
  ),
]

export type MonthlyTripleSeries = {
  month: string
  bookings: number
  cancellations: number
  relets: number
}

export const MARGIN_EARNED_FC_DATA = SYKES_MONTHS.map((month, index) => {
  const values = [1000, 800, 700, 600, 600, 600, 600, 600, 600, 600, 600, 600]
  return { month, value: values[index] }
})

export const EVENTS_BY_DATE_SUMMER_DATA: MonthlyTripleSeries[] = [
  { month: "Jan", bookings: 200, cancellations: 20, relets: 12 },
  { month: "Feb", bookings: 200, cancellations: 20, relets: 12 },
  { month: "Mar", bookings: 400, cancellations: 40, relets: 24 },
  { month: "Apr", bookings: 600, cancellations: 60, relets: 36 },
  { month: "May", bookings: 600, cancellations: 60, relets: 36 },
  { month: "Jun", bookings: 800, cancellations: 80, relets: 48 },
  { month: "Jul", bookings: 1500, cancellations: 150, relets: 90 },
  { month: "Aug", bookings: 2000, cancellations: 200, relets: 120 },
  { month: "Sep", bookings: 800, cancellations: 80, relets: 48 },
  { month: "Oct", bookings: 400, cancellations: 40, relets: 24 },
  { month: "Nov", bookings: 200, cancellations: 20, relets: 12 },
  { month: "Dec", bookings: 250, cancellations: 25, relets: 15 },
]

export const EVENTS_BY_DATE_DECLINING_DATA: MonthlyTripleSeries[] = [
  { month: "Jan", bookings: 1000, cancellations: 100, relets: 60 },
  { month: "Feb", bookings: 800, cancellations: 80, relets: 48 },
  { month: "Mar", bookings: 700, cancellations: 70, relets: 42 },
  { month: "Apr", bookings: 600, cancellations: 60, relets: 36 },
  { month: "May", bookings: 600, cancellations: 60, relets: 36 },
  { month: "Jun", bookings: 600, cancellations: 60, relets: 36 },
  { month: "Jul", bookings: 600, cancellations: 60, relets: 36 },
  { month: "Aug", bookings: 600, cancellations: 60, relets: 36 },
  { month: "Sep", bookings: 600, cancellations: 60, relets: 36 },
  { month: "Oct", bookings: 600, cancellations: 60, relets: 36 },
  { month: "Nov", bookings: 600, cancellations: 60, relets: 36 },
  { month: "Dec", bookings: 600, cancellations: 60, relets: 36 },
]

export const DEPARTURES_BY_DATE_DATA = EVENTS_BY_DATE_SUMMER_DATA

export const TRIPLE_SERIES_COLORS = {
  bookings: "#3f3f46",
  cancellations: "#71717a",
  relets: "#a1a1aa",
} as const

export const TRIPLE_SERIES_LABELS = {
  bookings: "FC Bookings Made",
  cancellations: "FC Cancellations",
  relets: "FC Relets",
} as const
