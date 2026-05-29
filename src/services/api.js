import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5226/api"
});

export default API;