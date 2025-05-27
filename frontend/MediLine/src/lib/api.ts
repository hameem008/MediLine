import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8081", // Backend server
  withCredentials: false, // Enable if using cookies
});
