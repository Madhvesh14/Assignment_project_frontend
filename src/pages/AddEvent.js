import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { addEvent } from "../services/eventService";

function AddEvent() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      location: "",
      eventDate: "",
      totalSeats: "",
      availableSeats: "",
      price: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await addEvent(formData);
        
      toast.success(response.data);

      navigate("/events");

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data || "Failed to add event"
      );
    }
  };

   return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Add Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Enter event title"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Description
            </label>

            <input
              type="text"
              name="description"
              placeholder="Enter event description"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="Enter location"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Event Date
            </label>

            <input
              type="datetime-local"
              name="eventDate"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Total Seats
            </label>

            <input
              type="number"
              name="totalSeats"
              placeholder="Enter total seats"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Available Seats
            </label>

            <input
              type="number"
              name="availableSeats"
              placeholder="Enter available seats"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Price
            </label>

            <input
              type="number"
              name="price"
              placeholder="Enter price"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition duration-300"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddEvent;