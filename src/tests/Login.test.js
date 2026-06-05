import { render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import { MemoryRouter } from "react-router-dom";

describe("Login Page", () => {

  test("renders login form", () => {

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("Enter email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter password")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /login/i
      })
    ).toBeInTheDocument();

  });

});