import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { createBooking } from "../services/bookingService";

function CreateBooking() {

  const { eventId } = useParams();

  const navigate = useNavigate();

  const [seatsBooked, setSeatsBooked] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await createBooking({
        eventId: Number(eventId),
        seatsBooked: Number(seatsBooked)
      });

      alert("Booking Successful");

      navigate("/my-bookings");

    } catch (error) {

      console.log(error);

      alert("Booking Failed because the number of seats booked exceeds the available seats.");
    }
  };

  return (

    <div className="form-container">

      <h2>Book Seats</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          placeholder="Number of Seats"
          value={seatsBooked}
          onChange={(e) =>
            setSeatsBooked(e.target.value)
          }
          required
        />

        <button type="submit">
          Book
        </button>

      </form>

    </div>
  );
}

export default CreateBooking;