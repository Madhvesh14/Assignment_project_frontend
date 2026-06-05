import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom";

describe("Navbar", () => {

  test("shows login and register when not logged in", () => {

    localStorage.clear();

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Login"))
      .toBeInTheDocument();

    expect(screen.getByText("Register"))
      .toBeInTheDocument();
  });

  test("shows my bookings when user logged in", () => {

    localStorage.setItem("token", "abc");
    localStorage.setItem("role", "User");

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("My Bookings"))
      .toBeInTheDocument();
  });

});