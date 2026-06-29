import API from "./api";

export const getAllEvents = async () => {
  const token = localStorage.getItem("token");

    return await API.get("/events", {
       headers: {
        Authorization: `Bearer ${token}`
       }
  });
};

export const getEventById = async (id) => {
   const token = localStorage.getItem("token");
    
   return await API.get(`/events/${id}`, {
       headers: {
        Authorization: `Bearer ${token}`
       }
  });
}; 


export const addEvent = async(eventData) => {
  const token = localStorage.getItem("token");

  return await API.post("/events", eventData, {
       headers: {
        Authorization: `Bearer ${token}`
       }
  });
};


export const updateEvent = async (id, eventData) => {
  const token = localStorage.getItem("token");

  return await API.put(`/events/${id}`, eventData, {
       headers: {
        Authorization: `Bearer ${token}`
       }
  });  
};


export const deleteEvent =  async(id) => {
  const token = localStorage.getItem("token");

  return await API.delete(`/events/${id}`, {
       headers: {
        Authorization: `Bearer ${token}`
       }
  });  
};


export const searchEventsByTitle = async (title) => {
  const token = localStorage.getItem("token")
    
  return await API.get(`/events/search?title=${title}`, 
   {
    headers: {
      Authorization: `Bearer ${token}`
    }
   }
  );
};