import type { HTMLStyledProps, ThemeProps } from "../../core"
import type { IconStyle } from "./icon.style"
import {
  createComponent,
  useInjectVarsIntoCss,
  useInjectVarsIntoProps,
} from "../../core"
import { iconStyle } from "./icon.style"

export interface IconProps
  extends HTMLStyledProps<"svg">,
    ThemeProps<IconStyle> {}

export const {
  component,
  PropsContext: IconPropsContext,
  usePropsContext: useIconPropsContext,
  withContext,
} = createComponent<IconProps, IconStyle>("icon", iconStyle)

/**
 * `Icon` is a general icon component that can be used in your projects.
 *
 * @see https://yamada-ui.com/components/icon
 */
export const Icon = withContext("svg")(
  {
    "aria-hidden": true,
    "data-icon": "",
    role: "img",
    verticalAlign: "middle",
  },
  (props) => {
    const css = useInjectVarsIntoCss(props.css, { fontSize: "size" })
    const rest = useInjectVarsIntoProps(props, { fontSize: "size" })

    return { ...rest, css, boxSize: "{size}" }
  },
)
