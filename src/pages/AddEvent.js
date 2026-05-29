import { useState } from "react";

import axios from "axios";

import {useNavigate} from "react-router-dom";

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

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5226/api/events", formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Event Added Successfully"
      );

      navigate("/events");

    }
    catch (error) {

      alert(
        "Failed to add event"
      );
    }
  };

  return (
    <div className="events-container">

      <h1>Add Event</h1>

      <form
        className="event-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="eventDate"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="totalSeats"
          placeholder="Total Seats"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="availableSeats"
          placeholder="Available Seats"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add Event
        </button>

      </form>

    </div>
  );
}

export default AddEvent;