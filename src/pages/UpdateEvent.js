import { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

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

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          `http://localhost:5226/api/events/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setFormData(
        response.data
      );

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data ||
        "Failed to load event"
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

      const token =
        localStorage.getItem("token");

      const response =
        await axios.put(
          `http://localhost:5226/api/events/${id}`,
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      toast.success(
        response.data
      );

      navigate("/events");

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data ||
        "Update failed"
      );
    }
  };

  return (
    <div className="events-container">

      <h1>Update Event</h1>

      <form
        className="event-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>Title</label>

            <input
             type="text"
             name="title"
             value={formData.title}
             onChange={handleChange}
           />

        </div>


        <div className="form-group">
          <label>Description</label>   

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
        </div>   


        <div className="form-group">

          <label>Location</label> 

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

        </div>

        <div className="form-group">

          <label>Event Date</label>    

            <input
              type="datetime-local"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
            />
        </div>


        <div className="form-group">

          <label>Total Seats</label>    

            <input
              type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
            />

        </div>



        <div className="form-group">

          <label>Available Seats</label>
            <input
              type="number"
              name="availableSeats"
              value={formData.availableSeats}
              onChange={handleChange}
            />

        </div>

        <div className="form-group">    
          <label>Price</label>    

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
        </div>    

        <button type="submit">
          Update Event
        </button>

      </form>

    </div>
  );
}

export default UpdateEvent;