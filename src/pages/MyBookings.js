import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "../styles/Event.css";

import "../styles/ConfirmModal.css";

import ConfirmModal from "../components/ConfirmModal";

import {
  getMyBookings,
  updateBooking,
  deleteBooking
} from "../services/bookingService";

function MyBookings() {

  const [bookings, setBookings] =
    useState([]);

  // Delete Modal States
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedBookingId, setSelectedBookingId] =
    useState(null);

  // Update Modal States
  const [showUpdateModal, setShowUpdateModal] =
    useState(false);

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [newSeatCount, setNewSeatCount] =
    useState("");

  const navigate = useNavigate();

  // Load Bookings
  const loadBookings = async () => {

    try {

      const response =
        await getMyBookings();

      console.log(
        "Bookings:",
        response
      );

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
        error.response?.data ||
        "Update Failed"
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

      const response =
        await deleteBooking(
          selectedBookingId
        );

      toast.success(
        response
      );

      const updatedBookings =
        bookings.filter(
          booking =>
            booking.id !==
            selectedBookingId
        );

      setBookings(
        updatedBookings
      );

      setShowDeleteModal(false);

      if (
        updatedBookings.length === 0
      ) {

        toast.info(
          "No bookings left"
        );

        navigate("/events");
      }

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data ||
        "Delete Failed"
      );

      setShowDeleteModal(false);
    }
  };

  return (

    <div className="events-container">

      <h1>My Bookings</h1>

      {
        bookings.length === 0 ? (

          <p>
            No bookings found.
          </p>

        ) : (

          bookings.map(
            (booking) => (

              <div
                key={booking.id}
                className="booking-card"
              >

                <h3>
                  {booking.eventTitle}
                </h3>

                <p>
                  <strong>
                    Booking ID:
                  </strong>{" "}
                  {booking.id}
                </p>

                <p>
                  <strong>
                    Seats Booked:
                  </strong>{" "}
                  {booking.seatsBooked}
                </p>

                <p>
                  <strong>
                    Booking Date:
                  </strong>{" "}
                  {
                    new Date(
                      booking.bookingDate
                    ).toLocaleString()
                  }
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {
                    booking.status ||
                    "Confirmed"
                  }
                </p>

                <div
                  className="booking-actions"
                >

                  <button
                    className="update-btn"
                    onClick={() =>
                      handleUpdate(
                        booking
                      )
                    }
                  >
                    Update
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        booking.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            )
          )

        )
      }

      {/* Delete Confirmation Modal */}

      <ConfirmModal
        isOpen={showDeleteModal}
        message="Are you sure you want to delete this booking?"
        onConfirm={
          confirmDeleteBooking
        }
        onCancel={() =>
          setShowDeleteModal(false)
        }
      />

      {/* Update Booking Modal */}

      {
        showUpdateModal && (

          <div className="modal-overlay">

            <div className="modal">

              <h3>
                Update Booking
              </h3>

              <p>
                Enter new seat count
              </p>

              <input
                type="number"
                value={newSeatCount}
                onChange={(e) =>
                  setNewSeatCount(
                    e.target.value
                  )
                }
                min="1"
                className="modal-input"
              />

              <div className="modal-buttons">

                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowUpdateModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="confirm-btn"
                  onClick={
                    confirmUpdateBooking
                  }
                >
                  Update
                </button>

              </div>

            </div>

          </div>

        )
      }

    </div>
  );
}

export default MyBookings;