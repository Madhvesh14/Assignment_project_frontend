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

      const response =
        await addEvent(formData);
        
      toast.success(
        response.data
      );

      navigate("/events");

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data ||
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

        <div className= "form-group">
          <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
              required
            />
        </div>    

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            required
          />
        </div>
        

        <div className="form-group">
          <label>Event Date</label>
          <input
            type="datetime-local"
            name="eventDate"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Total Seats</label>
          <input
            type="number"
            name="totalSeats"
            placeholder="Total Seats"
            onChange={handleChange}
            required
          />
        </div>      

        <div className="form-group">
          <label>Available Seats</label>
          <input
            type="number"
            name="availableSeats"
            placeholder="Available Seats"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          Add Event
        </button>

      </form>

    </div>
  );
}

export default AddEvent;