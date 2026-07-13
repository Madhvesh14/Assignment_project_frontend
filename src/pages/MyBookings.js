import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";



import ConfirmModal from "../components/ConfirmModal";

import { getMyBookings, updateBooking, deleteBooking } from "../services/bookingService";

function MyBookings() {

  const [bookings, setBookings] =
    useState([]);

  // Delete Modal States
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Update Modal States
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [newSeatCount, setNewSeatCount] = useState("");

  const navigate = useNavigate();

  // Load Bookings
  const loadBookings = async () => {

    try {

      const response = await getMyBookings();

      console.log("Bookings:",response);

      setBookings(
        response || []
      );

    }
    catch (error) {

      console.log(error);

      setBookings([]);
    }
  };

  useEffect(() => {

    loadBookings();

  }, []);

  // Open Update Modal
  const handleUpdate = (booking) => {

    setSelectedBooking(
      booking
    );

    setNewSeatCount(
      booking.seatsBooked
    );

    setShowUpdateModal(true);
  };

  // Confirm Update
  const confirmUpdateBooking = async () => {

    try {

      const response =
        await updateBooking(
          selectedBooking.id,
          {
            eventId:
              selectedBooking.eventId,

            seatsBooked:
              Number(newSeatCount)
          }
        );

      toast.success(
        response
      );

      loadBookings();

      setShowUpdateModal(false);

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data ||"Update Failed"
      );

      setShowUpdateModal(false);
    }
  };

  // Open Delete Modal
  const handleDelete = (id) => {

    setSelectedBookingId(id);

    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDeleteBooking = async () => {

    try {

      const response = await deleteBooking(selectedBookingId);

      toast.success(response);

      const updatedBookings = bookings.filter(
          booking =>
            booking.id !== selectedBookingId
        );

      setBookings(updatedBookings);
    

      setShowDeleteModal(false);

      if (updatedBookings.length === 0)
         {

        toast.info(
          "No bookings left"
        );

        navigate("/events");
      }

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data || "Delete Failed"
      );

      setShowDeleteModal(false);
    }
  };

   return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-lg text-gray-600">
              No bookings found.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 sm:p-6"
              >
                <h3 className="text-2xl font-semibold mb-4">
                  {booking.eventTitle}
                </h3>

                <div className="space-y-3 text-gray-700 text-sm sm:text-base">
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
                    {new Date(
                      booking.bookingDate
                    ).toLocaleString()}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {booking.status || "Confirmed"}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={() =>
                      handleUpdate(booking)
                    }
                    className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 text-white font-medium rounded-lg  px-6 py-2 w-full sm:w-auto"
                  >
                    Update
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(booking.id)
                    }
                    className="bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all duration-300 text-white rounded-lg  px-6 py-2 w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={showDeleteModal}
          message="Are you sure you want to delete this booking?"
          onConfirm={confirmDeleteBooking}
          onCancel={() => setShowDeleteModal(false)}
        />

        {/* Update Booking Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur sm flex items-center justify-center p-4 z-50 transition-all duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fadeIn">
              <h3 className="text-xl font-bold mb-3">
                Update Booking
              </h3>

              <p className="text-gray-600 mb-4">
                Enter new seat count
              </p>

              <input
                type="number"
                min="1"
                value={newSeatCount}
                onChange={(e) =>
                  setNewSeatCount(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
                <button
                  onClick={() =>
                    setShowUpdateModal(false)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmUpdateBooking}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;