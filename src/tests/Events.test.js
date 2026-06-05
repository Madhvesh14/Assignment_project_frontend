import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Events from "../pages/Events";
import axios from "axios";

jest.mock("axios");

jest.mock("../components/EventCard", () => () =>
  <div>Mock Event Card</div>
);

describe("Events Page", () => {

  beforeEach(() => {

    localStorage.setItem("token", "abc");

    axios.get.mockResolvedValue({
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

});