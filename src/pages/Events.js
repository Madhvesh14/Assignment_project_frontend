import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import EventCard from "../components/EventCard";

import ConfirmModal from "../components/ConfirmModal";

import { getAllEvents, searchEventsByTitle, deleteEvent } from "../services/eventService";

function Events() {

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchTitle, setSearchTitle] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedEventId, setSelectedEventId] = useState(null);

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
        

      toast.success(response.data);

      fetchEvents();

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data || "Delete failed"
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

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        All Events
      </h1>

      {
        role === "Admin" && (

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold transition mb-6"
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
        onChange={(e) => setSearchTitle(e.target.value)}
        className="w-full md:w-80 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 mb-8"
      />

      

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

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

              <div className="col-span-full bg-red-50 border border-red-200 rounded-lg shadow p-8 text-center">

                <h3 className="text-2xl font-bold text-red-600 mb-3">
                  No Event Found
                </h3>

                <p className="text-gray-600">
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