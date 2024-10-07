import axios from "axios";
// change i end at time of submeting and put backend link in api base url 
// Create an Axios instance
const api = axios.create({
  baseURL: "https://event-management-server-beta.vercel.app/api", // Make sure this matches your backend URL
});

// Add a request interceptor to include token in requests (if necessary)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
