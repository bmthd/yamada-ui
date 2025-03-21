import { a11y, render } from "../../../test"
import { Button } from "../button"
import { ButtonGroup } from "./button-group"

describe("<Button />", () => {
  test("passes a11y test", async () => {
    await a11y(
      <ButtonGroup>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>,
    )
  })

  test("sets `displayName` and `__styled__` correctly", () => {
    expect(ButtonGroup.displayName).toBe("ButtonGroup")
    expect(ButtonGroup.__styled__).toBe("ButtonGroup")
  })

  test("sets `className` correctly", () => {
    const { getByRole } = render(
      <ButtonGroup>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>,
    )

    expect(getByRole("group")).toHaveClass("ui-group")
  })

  test("renders HTML tag correctly", () => {
    const { getByRole } = render(
      <ButtonGroup>
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>,
    )

    expect(getByRole("group").tagName).toBe("DIV")
  })

  test("`attached` column style is applied correctly", () => {
    const { getByRole } = render(
      <ButtonGroup variant="outline" attached flexDirection="column">
        <Button>Button</Button>
        <Button>Button</Button>
        <Button>Button</Button>
      </ButtonGroup>,
    )

    const buttonGroup = getByRole("group")
    const style = getComputedStyle(buttonGroup)

    expect(style.flexDirection).toBe("column")
  })
})
