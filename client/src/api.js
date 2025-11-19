// src/api.js
import axios from "axios";

// Get API base URL from environment variable
// Vite env variables must start with VITE_
const BASE_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // only if backend uses cookies
});

export default api;
