import axios from "axios";

const API_URL =
  "http://localhost:5226/api/events";

export const getAllEvents = async () => {
  return await axios.get(API_URL);
};