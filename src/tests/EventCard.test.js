import { render, screen, fireEvent } from "@testing-library/react";
import EventCard from "../components/EventCard";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate
}));

describe("EventCard", () => {

  const event = {
    
    title: "Music Concert",
    description: "Live music",
    location: "Bangalore",
    eventDate: "2026-06-10",
    price: 500,
    availableSeats: 50,
    totalSeats: 100
  };

  test("renders event details", () => {

    localStorage.setItem("role", "User");

    render(
      <MemoryRouter>
        <EventCard event={event}/>
      </MemoryRouter>
    );

    expect(screen.getByText("Music Concert"))
      .toBeInTheDocument();

    expect(screen.getByText(/Live music/i))
      .toBeInTheDocument();
  });

  test("book seats button visible for user", () => {

    localStorage.setItem("role", "User");

    render(
      <MemoryRouter>
        <EventCard event={event}/>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Book Seats")
    ).toBeInTheDocument();
  });

  test("admin buttons visible for admin", () => {

    localStorage.setItem("role", "Admin");

    render(
      <MemoryRouter>
        <EventCard event={event}/>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Update Event")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Delete Event")
    ).toBeInTheDocument();
  });

});