import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

describe("Home Page", () => {

  test("renders welcome message", () => {

    render(<Home />);

    expect(
      screen.getByText("Welcome to Event Booking System")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Book events easily online.")
    ).toBeInTheDocument();

  });

});