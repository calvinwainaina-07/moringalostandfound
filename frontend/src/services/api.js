import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4001",
});

// Attach token automatically if present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;