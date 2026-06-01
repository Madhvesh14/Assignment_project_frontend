import { useEffect, useState} from "react";

import axios from "axios";

import { useNavigate, useParams} from "react-router-dom";

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

  useEffect(() => { fetchEvent(); }, []);

  const fetchEvent = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get( `http://localhost:5226/api/events/${id}`,
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

      alert(
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

      await axios.put( `http://localhost:5226/api/events/${id}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert("Event Updated Successfully");

      navigate("/events");

    }
    catch (error) {

      alert("Update failed" );
    }
  };

  return (
    <div className="events-container">

      <h1>Update Event</h1>

      <form
        className="event-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <input
          type="datetime-local"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
        />

        <input
          type="number"
          name="totalSeats"
          value={formData.totalSeats}
          onChange={handleChange}
        />

        <input
          type="number"
          name="availableSeats"
          value={formData.availableSeats}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <button type="submit">
          Update Event
        </button>

      </form>

    </div>
  );
}

export default UpdateEvent;