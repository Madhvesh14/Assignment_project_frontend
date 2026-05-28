import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import Register from "../pages/Register";

test("renders register heading", () => {
  render(<Register />);

  const heading = screen.getByRole("heading", {
    name: /Register/i,
  });

  expect(heading).toBeInTheDocument();
});