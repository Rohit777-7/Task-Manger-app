import axios from "axios";

const envBase = import.meta.env.VITE_API_URL as string | undefined;

const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";
const base = isLocalhost ? "http://localhost:4000" : envBase || "http://localhost:4000";

const api = axios.create({
  baseURL: base,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
