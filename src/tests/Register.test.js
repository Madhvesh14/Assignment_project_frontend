import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import Register from "../pages/Register";

describe("Register Component", () => {

  test("renders register heading", () => {

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const heading = screen.getByRole("heading", {
      name: /register/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test("renders fullname input", () => {

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const fullnameInput = screen.getByPlaceholderText(/enter full name/i);

    expect(fullnameInput).toBeInTheDocument();
  });

});