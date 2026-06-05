import { render, screen } from "@testing-library/react";
import Register from "../pages/Register";
import { MemoryRouter } from "react-router-dom";

describe("Register Page", () => {

  test("renders register form", () => {

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(
      screen.getByPlaceholderText("Enter full name")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter password")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /register/i
      })
    ).toBeInTheDocument();

  });

});