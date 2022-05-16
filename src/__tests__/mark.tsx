import { render, screen } from "@testing-library/react";
import { Mark } from "components/mark";

test("mark组件正确高亮", () => {
  const name = "物料管理";
  const keyword = "物料";

  render(<Mark name={name} keyword={keyword} />);
  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle("color:#257AFD");
  expect(screen.getByText("管理")).not.toHaveStyle("color:#257AFD");
});
