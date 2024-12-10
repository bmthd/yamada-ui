import { a11y, render, screen } from "@yamada-ui/test"
import { For } from "../src"

describe("<For />", () => {
  test("For renders correctly", async () => {
    await a11y(
      <For each={["One", "Two", "Three"]}>
        {(item, index) => <div key={index}>{item}</div>}
      </For>,
    )
  })

  test("For renders fallback when array is empty", () => {
    render(
      <For each={[]} fallback={<p>There are no items to show</p>}>
        {(item, index) => <p key={index}>{item}</p>}
      </For>,
    )
    expect(screen.getByText("There are no items to show")).toBeInTheDocument()
  })

  test("For renders fallback when array is undefined", () => {
    render(
      <For each={undefined} fallback={<p>There are no items to show</p>}>
        {(_, index) => <p key={index}>Item</p>}
      </For>,
    )
    expect(screen.getByText("There are no items to show")).toBeInTheDocument()
  })

  test("For renders correctly with filterBy", () => {
    render(
      <For each={["One", "Two", "Three"]} filterBy={(item) => item !== "Two"}>
        {(item, index) => <p key={index}>{item}</p>}
      </For>,
    )
    expect(screen.getByText("One")).toBeInTheDocument()
    expect(screen.getByText("Three")).toBeInTheDocument()
    expect(screen.queryByText("Two")).not.toBeInTheDocument()
  })

  test("For renders correctly with limitBy", () => {
    render(
      <For each={["One", "Two", "Three"]} limitBy={2}>
        {(item, index) => <div key={index}>{item}</div>}
      </For>,
    )
    expect(screen.getByText("One")).toBeInTheDocument()
    expect(screen.getByText("Two")).toBeInTheDocument()
    expect(screen.queryByText("Three")).not.toBeInTheDocument()
  })

  test("For renders correctly with offsetBy", () => {
    render(
      <For each={["One", "Two", "Three"]} offsetBy={1}>
        {(item, index) => <div key={index}>{item}</div>}
      </For>,
    )
    expect(screen.getByText("Two")).toBeInTheDocument()
    expect(screen.getByText("Three")).toBeInTheDocument()
    expect(screen.queryByText("One")).not.toBeInTheDocument()
  })

  test("For renders correctly with reverse", () => {
    render(
      <For each={["One", "Two", "Three"]} reverse>
        {(item, index) => <div key={index}>{item}</div>}
      </For>,
    )
    expect(screen.getByText("Three")).toBeInTheDocument()
    expect(screen.getByText("Two")).toBeInTheDocument()
    expect(screen.getByText("One")).toBeInTheDocument()
  })

  test("For renders correctly with sortBy", () => {
    render(
      <For each={["One", "Two", "Three"]} sortBy={(a, b) => a.localeCompare(b)}>
        {(item, index) => <p key={index}>{item}</p>}
      </For>,
    )
    const items = screen.getAllByRole("paragraph").map((el) => el.textContent)
    expect(items).toStrictEqual(["One", "Three", "Two"])
  })

  test("For renders correctly with combined options", () => {
    render(
      <For
        each={["One", "Two", "Three", "Four"]}
        filterBy={(item) => item !== "Two"}
        limitBy={2}
        offsetBy={1}
        reverse
        sortBy={(a, b) => a.localeCompare(b)}
      >
        {(item, index) => <p key={index}>{item}</p>}
      </For>,
    )
    const items = screen.getAllByRole("paragraph").map((el) => el.textContent)
    expect(items).toStrictEqual(["One", "Four"])
  })
})
