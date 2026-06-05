import { useNavigate } from "react-router-dom";

function EventCard({ event, onDelete }) {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  return (

    <div className="event-card">

      <p>
        <strong>Event ID:</strong>
        {event.id}
      </p>

      <h2>{event.title}</h2>

      <p>
        <strong>Description:</strong>
        {event.description}
      </p>

      <p>
        <strong>Location:</strong>
        {event.location}
      </p>

      <p>
        <strong>Date:</strong>
        {event.eventDate}
      </p>

      <p>
        <strong>Price:</strong>
        {event.price}
      </p>

      <p>
        <strong>Available Seats:</strong>
        {event.availableSeats}
      </p>

      <p>
        <strong>Total Seats:</strong>
        {event.totalSeats}
      </p>

      {role !== "Admin" && (

        <button
          className="book-btn"
          onClick={() =>
            navigate(`/create-booking/${event.id}`)
          }
        >
          Book Seats
        </button>

      )}

      {role === "Admin" && (

        <div className="admin-buttons">

          <button
            onClick={() =>
              navigate(`/update-event/${event.id}`)
            }
          >
            Update Event
          </button>

          <button
            onClick={() =>
              onDelete(event.id)
            }
          >
            Delete Event
          </button>

        </div>

      )}

    </div>

  );
}

export default EventCard;