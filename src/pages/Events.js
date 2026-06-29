import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import EventCard from "../components/EventCard";

import ConfirmModal from "../components/ConfirmModal";

import { getAllEvents, searchEventsByTitle, deleteEvent } from "../services/eventService";

import "../styles/Event.css";

function Events() {

  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [searchTitle, setSearchTitle] =
    useState("");

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedEventId, setSelectedEventId] =
    useState(null);

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


  useEffect(() => {
    
    const delaySearch = setTimeout(() => {
      
      if (searchTitle.trim() ===""){
       
        fetchEvents();
      
      } else {
       
        handleSearch();
      
      }
    }, 500);

    return() => clearTimeout(delaySearch)

  }, [searchTitle]);

  const fetchEvents = async () => {

    try {

      const response = await getAllEvents();

      const sortedEvents =
        response.data.sort(
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

  const handleSearch = async() => {
    try {
      

      const response = await searchEventsByTitle(searchTitle);

      const sortedEvents =
        response.data.sort(
          (a, b) => a.id - b.id
        );

      setEvents(sortedEvents);

      
    }

    catch(error){
      console.log(error);

    }
    
  };

  const handleDelete = (id) => {

    setSelectedEventId(id);

    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {

    try {

      const response = await deleteEvent(selectedEventId);
        

      toast.success(
        response.data
      );

      fetchEvents();

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data ||
        "Delete failed"
      );
    }
    finally {

      setShowDeleteModal(false);

      setSelectedEventId(null);
    }
  };


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
            onClick={() =>
              navigate("/add-event")
            }
          >
            Add Event
          </button>

        )
      }

      <input
        type="text"
        placeholder="Search by Event Title"
        value={searchTitle}
        onChange={(e) =>
          setSearchTitle(
            e.target.value
          )
        }
        className="search-box"
      />

      

      <div className="event-grid">

        {
          events.length > 0 ? (

            events.map(
              (event) => (

                <EventCard
                  key={event.id}
                  event={event}
                  onDelete={handleDelete}
                />

              )
            )

          ) : (

            searchTitle !== "" && (

              <div className="no-events">

                <h3>
                  No Event Found
                </h3>

                <p>
                  No event exists with title "{searchTitle}"
                </p>

              </div>

            )

          )
        }

      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Event"
        message="Are you sure you want to delete this event?"
        onConfirm={confirmDelete}
        onCancel={() => {

          setShowDeleteModal(false);

          setSelectedEventId(null);

        }}
      />

    </div>

  );
}

export default Events;