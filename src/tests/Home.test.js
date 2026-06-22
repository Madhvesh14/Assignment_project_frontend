import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/Home";

// Mock image import
jest.mock("../assets/hero-image.jpg", () => "hero-image.jpg");

// Mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Home Component", () => {

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders welcome heading", () => {

    render(<Home />);

    expect(
      screen.getByText("Welcome to Event Booking System")
    ).toBeInTheDocument();

  });

  test("renders first description text", () => {

    render(<Home />);

    expect(
      screen.getByText(
        "Discover and book amazing events online."
      )
    ).toBeInTheDocument();

  });

  test("renders second description text", () => {

    render(<Home />);

    expect(
      screen.getByText(
        "Music, Workshops, Conferences and more."
      )
    ).toBeInTheDocument();

  });

  test("renders Register Now button", () => {

    render(<Home />);

    const button = screen.getByRole("button", {
      name: /Register Now/i,
    });

    expect(button).toBeInTheDocument();

  });

  test("navigates to register page when Register Now button is clicked", () => {

    render(<Home />);

    const button = screen.getByRole("button", {
      name: /Register Now/i,
    });

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/register");

  });

});