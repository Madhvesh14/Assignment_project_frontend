import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Event.css";

import { getMyBookings, updateBooking,deleteBooking} from "../services/bookingService";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  const navigate = useNavigate();

  const loadBookings = async () => {

    try {

      const response = await getMyBookings();

      console.log("Bookings:", response);

      setBookings(response || []);

    } catch (error) {

      console.log(error);

      setBookings([]);
    }
  };

  useEffect(() => {

    loadBookings();

  }, []);

  const handleUpdate = async (booking) => {

    const seats = prompt(
      "Enter new seat count",
      booking.seatsBooked
    );

    if (!seats) return;

    try {

      await updateBooking(
        booking.id,
        {
          eventId: booking.eventId,
          seatsBooked: Number(seats)
        }
      );

      alert("Booking Updated");

      loadBookings();

    } catch (error) {

      console.log(error);

      alert("Update Failed");
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmDelete) return;

    try {

      await deleteBooking(id);

      const updatedBookings =
        bookings.filter(
          booking => booking.id !== id
        );

      setBookings(updatedBookings);

      if (updatedBookings.length === 0) {

        alert("No bookings left");

        navigate("/events");
      }

    } catch (error) {

      console.log(error);

      alert("Delete Failed");
    }
  };

  return (

    <div className="events-container">

      <h1>My Bookings</h1>

      {
        bookings.length === 0 ? (

          <p>No bookings found.</p>

        ) : (

          bookings.map((booking) => (

            <div
              key={booking.id}
              className="booking-card"
            >

              <h3>{booking.eventTitle}</h3>

              <p>
                <strong>Booking ID:</strong>{" "}
                {booking.id}
              </p>

              <p>
                <strong>Seats Booked:</strong>{" "}
                {booking.seatsBooked}
              </p>

              <p>
                <strong>Booking Date:</strong>{" "}
                {
                  new Date(
                    booking.bookingDate
                  ).toLocaleString()
                }
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {
                  booking.status ||
                  "Confirmed"
                }
              </p>

              <div className="booking-actions">

                <button
                  className="update-btn"
                  onClick={() =>
                    handleUpdate(booking)
                  }
                >
                  Update
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(booking.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )
      }

    </div>
  );
}

export default MyBookings;