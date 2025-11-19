import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; // must start with VITE_ in Vite

const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // only if backend uses cookies
});

export default api;
