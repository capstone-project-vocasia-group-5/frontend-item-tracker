import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// auth
export const loginUser = (user) => api.post("/auth/signin", user);
export const loginAdmin = (user) => api.post("/auth/admin/signin", user);
export const sendOTP = (data) => api.post("/auth/send-otp", data);
export const verifyOTP = (data) => api.post("/auth/otp", data);
export const registerUser = (user) => api.post("/auth/register", user);

// donate
export const donate = (data) => api.post("/donations", data);
export const getDonations = (data) => api.get("/donations",data); 
