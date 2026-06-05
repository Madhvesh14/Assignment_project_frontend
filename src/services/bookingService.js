import API from "./api";

export const createBooking = async (bookingData) => {

  const token = localStorage.getItem("token");

  const response = await API.post(
    "/bookings",
    bookingData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const getMyBookings = async () => {

  const token = localStorage.getItem("token");

  const response = await API.get(
    "/bookings/mybookings",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const updateBooking = async (id, bookingData) => {

  const token = localStorage.getItem("token");

  const response = await API.put(
    `/bookings/${id}`,
    bookingData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const deleteBooking = async (id) => {

  const token = localStorage.getItem("token");

  const response = await API.delete(
    `/bookings/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};