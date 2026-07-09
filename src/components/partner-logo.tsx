import { cn } from "@/lib/utils"
import { PARTNER_BRANDING } from "@/lib/partner-branding"
import sykesLogo from "@/assets/sykes-holiday-cottages-logo.png"

type PartnerLogoProps = {
  className?: string
  compact?: boolean
  variant?: "sidebar" | "hero"
}

export function PartnerLogo({ className, compact = false, variant = "sidebar" }: PartnerLogoProps) {
  if (variant === "hero") {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <img
          src={sykesLogo}
          alt={PARTNER_BRANDING.name}
          className="h-24 w-auto object-contain object-left"
        />
      </div>
    )
  }

  if (compact) {
    return (
      <div className={cn("flex min-w-0 items-center", className)}>
        <img
          src={sykesLogo}
          alt={PARTNER_BRANDING.name}
          className="h-10 w-10 object-cover object-left"
        />
      </div>
    )
  }

  return (
    <div className={cn("flex min-w-0 items-center", className)}>
      <img
        src={sykesLogo}
        alt={PARTNER_BRANDING.name}
        className="h-14 w-auto max-w-[300px] object-contain object-left"
      />
    </div>
  )
}
