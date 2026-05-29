import { render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import Login from "../pages/Login";

describe("Login Component", () => {

  test("renders login heading", () => {

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const heading = screen.getByRole("heading", {
      name: /login/i,
    });

    expect(heading).toBeInTheDocument();
  });

  test("renders email input", () => {

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/enter email/i);

    expect(emailInput).toBeInTheDocument();
  });

  test("renders password input", () => {

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText(/enter password/i);

    expect(passwordInput).toBeInTheDocument();
  });

});