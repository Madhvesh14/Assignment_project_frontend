import axios from "axios";

const API_URL =
  "http://localhost:5226/api/events";

export const getAllEvents = async () => {
  return await axios.get(API_URL);
};

export const searchEventsByTitle = async (title, token) => {
  return await axios.get(
   `${API_URL}/search?title=${title}`, 
   {
    headers: {
      Authorization: `Bearer ${token}`
    }
   }
  );
};