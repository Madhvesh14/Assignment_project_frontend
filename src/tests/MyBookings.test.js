import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MyBookings from "../pages/MyBookings";

jest.mock("../services/bookingService", () => ({
  getMyBookings: jest.fn(() => Promise.resolve([])),
  updateBooking: jest.fn(),
  deleteBooking: jest.fn()
}));

describe("MyBookings Page", () => {

  test("renders heading", () => {

    render(
      <MemoryRouter>
        <MyBookings />
      </MemoryRouter>
    );

    expect(
      screen.getByText("My Bookings")
    ).toBeInTheDocument();

  });

});