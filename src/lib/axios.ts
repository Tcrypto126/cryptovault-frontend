import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "https://penguin-rare-willingly.ngrok-free.app";

const instance = axios.create({
  baseURL,
  timeout: 20000, // 10 second timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to dynamically set auth header
instance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
  }

  // Add CORS headers for ngrok
  config.headers["ngrok-skip-browser-warning"] = "true";

  return config;
});

// Add response interceptor to handle CORS errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 0) {
      console.error("CORS Error or Network Error:", error);
      throw new Error("Network error - please check your connection");
    }
    return Promise.reject(error);
  }
);

export default instance;
