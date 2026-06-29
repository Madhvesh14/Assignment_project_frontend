import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import { getEventById,updateEvent } from "../services/eventService";

function UpdateEvent() {

  const { id } = useParams();

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

  useEffect(() => {

    fetchEvent();

  }, []);

  const fetchEvent = async () => {

    try {

      const response = await getEventById(id);

      setFormData(response.data
      );

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data || "Failed to load event"
      );
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await updateEvent(id,formData)

      toast.success(response.data
      );

      navigate("/events");

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data || "Update failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Update Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Description
            </label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Event Date
            </label>

            <input
              type="datetime-local"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Total Seats
            </label>

            <input
              type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Available Seats
            </label>

            <input
              type="number"
              name="availableSeats"
              value={formData.availableSeats}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-sm font-semibold text-gray-700">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEvent;