import axios from "axios";

const api = axios.create({
  baseURL: "https://foodbook-zlsh.onrender.com",
});

export default api;
