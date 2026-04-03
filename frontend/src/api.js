import axios from "axios";

const API = axios.create({
  baseURL: "https://job-tracker-mern-s0gb.onrender.com/api",
  timeout: 15000, // FIX: Render free tier cold-starts can take ~10-15s. Without timeout the request hangs silently.
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  // BUG FIX: Was setting token without "Bearer " prefix.
  // Backend jwt.verify() expects a raw token but standard practice (and most middleware)
  // expects "Bearer <token>". Aligning here AND in the middleware.
  if (token) req.headers.authorization = `Bearer ${token}`;
  return req;
});

// Global response interceptor: auto-logout on 401
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default API;
