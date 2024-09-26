import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "../App";

test("click 버튼이 있다.", () => {
  const TEXT = "click";

  render(<App />);
  expect(screen.getByText(TEXT)).toBeInTheDocument();
});
