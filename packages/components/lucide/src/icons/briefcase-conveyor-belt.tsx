import type { LucideIconProps } from "../lucide-icon"
import { forwardRef } from "@yamada-ui/core"
import { BriefcaseConveyorBelt as BriefcaseConveyorBeltIcon } from "lucide-react"
import { LucideIcon } from "../lucide-icon"

/**
 * `BriefcaseConveyorBelt` is [Lucide](https://lucide.dev) SVG icon component.
 *
 * @see Docs https://yamada-ui.com/components/media-and-icons/lucide
 */
export const BriefcaseConveyorBelt = forwardRef<LucideIconProps, "svg">(
  (props, ref) => (
    <LucideIcon ref={ref} as={BriefcaseConveyorBeltIcon} {...props} />
  ),
)
