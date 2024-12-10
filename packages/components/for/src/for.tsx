import type { HTMLUIProps, ThemeProps } from "@yamada-ui/core"
import type { ReactNode } from "react"
import { useComponentStyle } from "@yamada-ui/core"
import { isArray } from "@yamada-ui/utils"

interface ForOptions<T> {
  /**
   * The render function to render each item in the array.
   */
  children: (item: T, index: number) => ReactNode
  /**
   * The array to iterate over.
   */
  each: readonly T[] | T[] | undefined
  /**
   * The fallback content to render when the array is empty.
   */
  fallback?: ReactNode
  /**
   * A function that returns a boolean indicating whether the item should be included in the render result.
   */
  filterBy?: (item: T, index: number, array: T[]) => boolean
  /**
   * The maximum number of items to include in the render result.
   */
  limitBy?: number
  /**
   * The number of items to skip before including them in the render result.
   * @default 0
   */
  offsetBy?: number
  /**
   * The boolean value to determine the order of the items in the array.
   * If `true`, the items will be reversed.
   * If `sortedBy` is provided, inversion is applied to the sorted array.
   * @default false
   */
  reverse?: boolean
  /**
   * The function to sort the items in the array.
   * If function is provided, the items will be sorted based on the return value.
   * If `reverse` is `true`, the inversion is applied to the sorted array.
   */
  sortBy?: (a: T, b: T) => number
}

export interface ForProps<T>
  extends Omit<HTMLUIProps, "children">,
    ThemeProps<"For">,
    ForOptions<T> {}

/**
 * `For` is a component used to loop over an array and render a component for each item.
 *
 * @see Docs https://yamada-ui.com/components/other/for
 */
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const For = <T extends unknown>(props: ForProps<T>): ReactNode => {
  const [
    ,
    {
      children,
      each,
      fallback,
      filterBy,
      limitBy,
      offsetBy = 0,
      reverse,
      sortBy,
    },
  ] = useComponentStyle("For", props)

  if (!each || !isArray(each) || !each.length) return fallback || null

  function* generate(each: T[]) {
    const filtered = each.filter(filterBy || (() => true))
    const sorted = sortBy ? filtered.toSorted(sortBy) : filtered
    const reversed = reverse ? sorted.toReversed() : sorted
    const sliced = limitBy
      ? reversed.slice(offsetBy, offsetBy + limitBy)
      : reversed.slice(offsetBy)
    for (const [index, item] of sliced.entries()) {
      yield children(item, reverse ? each.length - index - 1 : index)
    }
  }

  return Array.from(generate(each))
}
