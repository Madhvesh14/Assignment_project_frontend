import API from "../services/api";

import { createBooking, getMyBookings, updateBooking, deleteBooking }
from "../services/bookingService";

jest.mock("../services/api");

describe("Booking Service", () => {

  beforeEach(() => {

    localStorage.setItem("token", "abc");
  });

  test("create booking", async () => {

    API.post.mockResolvedValue({
      data: "Booking successful"
    });

    const result =
      await createBooking({
        eventId: 1,
        seatsBooked: 2
      });

    expect(result)
      .toBe("Booking successful");
  });

  test("get bookings", async () => {

    API.get.mockResolvedValue({
      data: []
    });

    const result =
      await getMyBookings();

    expect(result)
      .toEqual([]);
  });

  test("update booking", async () => {

    API.put.mockResolvedValue({
      data: "Updated"
    });

    const result =
      await updateBooking(1,{
        eventId:1,
        seatsBooked:3
      });

    expect(result)
      .toBe("Updated");
  });

  test("delete booking", async () => {

    API.delete.mockResolvedValue({
      data: "Deleted"
    });

    const result =
      await deleteBooking(1);

    expect(result)
      .toBe("Deleted");
  });

});