import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { createBooking } from "../services/bookingService";

function CreateBooking() {

  const { eventId } = useParams();

  const navigate = useNavigate();

  const [seatsBooked, setSeatsBooked] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await createBooking({
          eventId: Number(eventId),
          seatsBooked: Number(seatsBooked)
        });

      toast.success(response);

      navigate("/my-bookings");

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data || "Booking Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Book Seats
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Enter the Number of Seats
            </label>

            <input
              type="number"
              placeholder="Number of Seats"
              value={seatsBooked}
              onChange={(e) => setSeatsBooked(e.target.value)}
              required
              min="1"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300"
          >
            Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBooking;