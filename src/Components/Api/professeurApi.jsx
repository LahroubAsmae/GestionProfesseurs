import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Assure-toi que le port correspond à ton backend
});

export default api;
