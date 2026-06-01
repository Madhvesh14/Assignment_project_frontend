import {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

import axios from "axios";

import EventCard from "../components/EventCard";

import "../styles/Event.css";

function Events() {

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [searchId, setSearchId] =
    useState("");

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      navigate("/login");

      return;
    }

    fetchEvents();

  }, []);

  const fetchEvents = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(
          "http://localhost:5226/api/events",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const sortedEvents = response.data.sort(
          (a, b) => a.id - b.id
        );

      setEvents(sortedEvents);

    }
    catch (error) {

      console.log(error);

      setError(
        "Failed to load events"
      );
    }
    finally {

      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =window.confirm("Are you sure you want to delete this event?");

    if (!confirmDelete) {

      return;
    }

    try {

      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5226/api/events/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Event Deleted Successfully"
      );

      fetchEvents();

    }
    catch (error) {

      alert(
        "Delete failed"
      );
    }
  };

  const filteredEvents = searchId === "" ? events : events.filter(
          (event) => event.id === Number(searchId)
        );

  if (loading) {

    return <h2>Loading...</h2>;
  }

  if (error) {

    return <h2>{error}</h2>;
  }

  return (
    <div className="events-container">

      <h1>All Events</h1>

      {
        role === "Admin" && (

          <button
            className="admin-btn"
            onClick={() => navigate("/add-event")
            }
          >
            Add Event
          </button>
        )
      }

      <input
        type="number"
        placeholder=
          "Search by Event ID"
        value={searchId}
        onChange={(e) => setSearchId( e.target.value )
        }
        className="search-box"
      />

      <div className="event-grid">

        {
          filteredEvents.map((event) => (

            <EventCard
              key={event.id}
              event={event}
              onDelete={
                handleDelete
              }
            />

          ))
        }

      </div>

    </div>
  );
}

export default Events;