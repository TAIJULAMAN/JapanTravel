import axios from "axios";
import { BASE_URL } from "../constant/constant";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`, // Base URL for all requests,
  timeout: 1000000, // Timeout after 5 seconds
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Request interceptor for attaching tokens, logging, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token or other headers to the request
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor for handling responses globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Successful response (status codes 200 - 299)
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Handle 401 Unauthorized: perhaps redirect to login
        
        window.location.href = "/signin";
      }
      if (status === 500) {
        // Handle 500 Internal Server Error: show an error message
       
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Network error or no response from server");
    } else {
      // Something happened in setting up the request
      console.error("Error in request setup:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
