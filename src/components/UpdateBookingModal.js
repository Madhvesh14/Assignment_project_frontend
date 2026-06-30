import { useState } from "react";


function UpdateBookingModal({currentSeats, onUpdate,onCancel})
{

  const [seats, setSeats] = useState(currentSeats);

  return (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">

    <div className="bg-white w-[90%] max-w-md rounded-xl shadow-2xl p-6 transition-all duration-300">

      <h2 className="text-2xl font-bold mb-2">
        Update Booking
      </h2>

      <p className="text-gray-600 mb-5">
        Enter new seat count
      </p>

      <input
        type="number"
        min="1"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
      />

      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">

        <button
          onClick={onCancel}
          className="w-full sm:w-32 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Cancel
        </button>

        <button
          onClick={() => onUpdate(Number(seats))}
          className="w-full sm:w-32 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Update
        </button>

      </div>

    </div>

  </div>
);
}

export default UpdateBookingModal;