import { useState } from "react";

import "../styles/UpdateBookingModal.css";

function UpdateBookingModal({currentSeats, onUpdate,onCancel})
{

  const [seats, setSeats] =
    useState(currentSeats);

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h3>Update Booking</h3>

        <p>Enter new seat count</p>

        <input
          type="number"
          min="1"
          value={seats}
          onChange={(e) =>
            setSeats(e.target.value)
          }
        />

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={() =>
              onUpdate(Number(seats))
            }
          >
            Update
          </button>

        </div>

      </div>

    </div>

  );
}

export default UpdateBookingModal;