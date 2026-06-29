import { useState } from "react";


function UpdateBookingModal({currentSeats, onUpdate,onCancel})
{

  const [seats, setSeats] = useState(currentSeats);

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
        <h3 className="text-xl font-bold mb-3">
          Update Booking
        </h3>

        <p className="text-gray-600 mb-4">
          Enter new seat count
        </p>

        <input
          type="number"
          min="1"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <div className="w-full flex justify-center gap-4 mt-6">
          <button
            onClick={onCancel}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onUpdate(Number(seats))}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateBookingModal;