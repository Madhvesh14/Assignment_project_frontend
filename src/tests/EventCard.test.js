import {render,screen} from "@testing-library/react";

import {BrowserRouter} from "react-router-dom";

import EventCard from "../components/EventCard";

describe("EventCard Component", () => {

    const mockEvent = {

      id: 1,

      title:
        "Music Show",

      description:
        "Live concert",

      location:
        "Bangalore",

      eventDate:
        "2026-05-29",

      price: 500,

      availableSeats: 100,

      totalSeats: 150
    };

    test("renders event title", () => {

        render(
          <BrowserRouter>

            <EventCard
              event={mockEvent}
              onDelete={() => {}}
            />

          </BrowserRouter>
        );

        const title = screen.getByText(/music show/i);

        expect(title).toBeInTheDocument();
      }
    );
  }
);