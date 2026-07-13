import { useNavigate } from "react-router-dom";

function EventCard({ event, onDelete }) {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:-translate-y-2  hover:shadow-2xl hover:scale-[1.02]">
      <h2 className="text-2xl font-bold mb-4">
        {event.title}
      </h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Description:</strong> {event.description}
        </p>

        <p>
          <strong>Location:</strong> {event.location}
        </p>

        <p>
          <strong>Date:</strong> {event.eventDate}
        </p>

        <p>
          <strong>Price:</strong> ₹{event.price}
        </p>

        <p>
          <strong>Available Seats:</strong> {event.availableSeats}
        </p>

        <p>
          <strong>Total Seats:</strong> {event.totalSeats}
        </p>
      </div>

      {role !== "Admin" && (
        <button
          onClick={() =>
            navigate(`/create-booking/${event.id}`)
          }
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Book Seats
        </button>
      )}

      {role === "Admin" && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() =>
              navigate(`/update-event/${event.id}`)
            }
            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update
          </button>

          <button
            onClick={() => onDelete(event.id)}
            className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default EventCard;