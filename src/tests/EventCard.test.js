import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventCard from "../components/EventCard";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("EventCard Component", () => {

  const event = {
    id: 1,
    title: "React Conference",
    description: "Learn React",
    location: "Bangalore",
    eventDate: "2026-07-20",
    price: 500,
    availableSeats: 25,
    totalSeats: 50,
  };

  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test("renders event details", () => {

    localStorage.setItem("role", "User");

    render(
      <MemoryRouter>
        <EventCard
          event={event}
          onDelete={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText("React Conference")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Learn React/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Bangalore/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/25/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/50/)
    ).toBeInTheDocument();
  });

  test("shows Book Seats button for User", () => {

    localStorage.setItem("role", "User");

    render(
      <MemoryRouter>
        <EventCard
          event={event}
          onDelete={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", {
        name: /Book Seats/i,
      })
    ).toBeInTheDocument();
  });

  test("navigates to booking page when Book Seats clicked", () => {

    localStorage.setItem("role", "User");

    render(
      <MemoryRouter>
        <EventCard
          event={event}
          onDelete={jest.fn()}
        />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Book Seats/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/create-booking/1"
    );
  });

  test("shows Update and Delete buttons for Admin", () => {

    localStorage.setItem("role", "Admin");

    render(
      <MemoryRouter>
        <EventCard
          event={event}
          onDelete={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", {
        name: /Update/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /Delete/i,
      })
    ).toBeInTheDocument();
  });

  test("navigates to update page when Update clicked", () => {

    localStorage.setItem("role", "Admin");

    render(
      <MemoryRouter>
        <EventCard
          event={event}
          onDelete={jest.fn()}
        />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Update/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/update-event/1"
    );
  });

  test("calls onDelete when Delete clicked", () => {

    localStorage.setItem("role", "Admin");

    const onDelete = jest.fn();

    render(
      <MemoryRouter>
        <EventCard
          event={event}
          onDelete={onDelete}
        />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Delete/i,
      })
    );

    expect(onDelete).toHaveBeenCalledWith(1);
  });

});