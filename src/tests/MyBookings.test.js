import {
  render,
  screen,
  fireEvent,
  waitFor
}
from "@testing-library/react";

import { MemoryRouter }
from "react-router-dom";

import MyBookings
from "../pages/MyBookings";

import {
  getMyBookings
}
from "../services/bookingService";

jest.mock(
  "../services/bookingService",
  () => ({
    getMyBookings: jest.fn(),
    updateBooking: jest.fn(),
    deleteBooking: jest.fn()
  })
);

describe(
  "MyBookings Page",
  () => {

    test(
      "renders heading",
      async () => {

        getMyBookings.mockResolvedValue([]);

        render(

          <MemoryRouter>
            <MyBookings />
          </MemoryRouter>

        );

        expect(
          screen.getByText(
            "My Bookings"
          )
        ).toBeInTheDocument();

      }
    );

    test(
      "shows no bookings message",
      async () => {

        getMyBookings.mockResolvedValue([]);

        render(

          <MemoryRouter>
            <MyBookings />
          </MemoryRouter>

        );

        expect(
          await screen.findByText(
            "No bookings found."
          )
        ).toBeInTheDocument();

      }
    );

    test(
      "opens update modal",
      async () => {

        getMyBookings.mockResolvedValue([
          {
            id: 1,
            eventId: 1,
            eventTitle: "React Event",
            seatsBooked: 2,
            bookingDate: "2025-01-01",
            status: "Confirmed"
          }
        ]);

        render(

          <MemoryRouter>
            <MyBookings />
          </MemoryRouter>

        );

        const updateButton =
          await screen.findByText(
            "Update"
          );

        fireEvent.click(
          updateButton
        );

        expect(
          screen.getByText(
            "Update Booking"
          )
        ).toBeInTheDocument();

      }
    );

    test(
      "opens delete modal",
      async () => {

        getMyBookings.mockResolvedValue([
          {
            id: 1,
            eventId: 1,
            eventTitle: "React Event",
            seatsBooked: 2,
            bookingDate: "2025-01-01",
            status: "Confirmed"
          }
        ]);

        render(

          <MemoryRouter>
            <MyBookings />
          </MemoryRouter>

        );

        const deleteButton =
          await screen.findByText(
            "Delete"
          );

        fireEvent.click(
          deleteButton
        );

        expect(
          screen.getByText(
            "Are you sure you want to delete this booking?"
          )
        ).toBeInTheDocument();

      }
    );

  }
);