import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("randevu_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;

    // Extract field-level validation error if present
    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      const firstErr = data.errors[0];
      const msg = firstErr.path
        ? `${firstErr.path}: ${firstErr.message}`
        : firstErr.message;
      return Promise.reject(new Error(msg));
    }

    const message =
      data?.message ||
      data?.error ||
      error.message ||
      "A network or server error occurred.";

    return Promise.reject(new Error(message));
  }
);