import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Events from "../pages/Events";

import {
  getAllEvents,
  searchEventsByTitle,
  deleteEvent
} from "../services/eventService";

jest.mock("../services/eventService");

jest.mock("../components/EventCard", () => () => (
  <div>Mock Event Card</div>
));

jest.mock("../components/ConfirmModal", () => () => (
  <div>Mock Confirm Modal</div>
));

describe("Events Page", () => {

  beforeEach(() => {

    localStorage.setItem("token", "abc");

    localStorage.setItem("role", "User");

    getAllEvents.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Music Concert",
          description: "Live Music",
          location: "Bangalore",
          eventDate: "2026-06-10",
          price: 500,
          availableSeats: 50,
          totalSeats: 100
        }
      ]
    });

    searchEventsByTitle.mockResolvedValue({
      data: []
    });

    deleteEvent.mockResolvedValue({
      data: "Event Deleted Successfully"
    });

  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("renders events heading", async () => {

    render(
      <MemoryRouter>
        <Events />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("All Events")
    ).toBeInTheDocument();

  });

  test("renders event card", async () => {

    render(
      <MemoryRouter>
        <Events />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Mock Event Card")
    ).toBeInTheDocument();

  });

});