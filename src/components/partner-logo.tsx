import { cn } from "@/lib/utils"
import { PARTNER_BRANDING } from "@/lib/partner-branding"
import sykesLogoBlue from "@/assets/sykes-holiday-cottages-logo.png"
import sykesLogoMask from "@/assets/sykes-logo-mask.png"

type PartnerLogoProps = {
  className?: string
  compact?: boolean
  variant?: "sidebar" | "hero"
  /** Force white logo (e.g. on blue gradient backgrounds). */
  inverted?: boolean
}

export function PartnerLogo({
  className,
  compact = false,
  variant = "sidebar",
  inverted = false,
}: PartnerLogoProps) {
  const sizeClass =
    variant === "hero"
      ? "h-10 w-auto max-w-[220px]"
      : compact
        ? "h-6 w-6"
        : "h-6 w-auto max-w-[140px]"

  const whiteLogo = (
    <span
      role="img"
      aria-label={PARTNER_BRANDING.name}
      className={cn(
        "shrink-0 bg-white",
        compact ? "aspect-square" : "aspect-[1024/201]",
        sizeClass
      )}
      style={{
        WebkitMaskImage: `url(${sykesLogoMask})`,
        maskImage: `url(${sykesLogoMask})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: compact ? "left center" : "center",
        maskPosition: compact ? "left center" : "center",
        WebkitMaskSize: compact ? "auto 100%" : "contain",
        maskSize: compact ? "auto 100%" : "contain",
      }}
    />
  )

  if (inverted) {
    return <div className={cn("flex min-w-0 items-center", className)}>{whiteLogo}</div>
  }

  return (
    <div className={cn("flex min-w-0 items-center", className)}>
      {/* Light mode: solid Sykes blue logo */}
      <img
        src={sykesLogoBlue}
        alt={PARTNER_BRANDING.name}
        className={cn("object-contain object-left dark:hidden", sizeClass, compact && "object-cover")}
      />
      {/* Dark mode: white logo via mask */}
      <span
        role="img"
        aria-label={PARTNER_BRANDING.name}
        className={cn(
          "hidden shrink-0 bg-white dark:inline-block",
          compact ? "aspect-square" : "aspect-[1024/201]",
          sizeClass
        )}
        style={{
          WebkitMaskImage: `url(${sykesLogoMask})`,
          maskImage: `url(${sykesLogoMask})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: compact ? "left center" : "center",
          maskPosition: compact ? "left center" : "center",
          WebkitMaskSize: compact ? "auto 100%" : "contain",
          maskSize: compact ? "auto 100%" : "contain",
        }}
      />
    </div>
  )
}
