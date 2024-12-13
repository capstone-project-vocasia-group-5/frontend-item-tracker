import axios from "axios";
import { data } from "react-router-dom";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
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
export const getDonations = (data) => api.get("/donations", data);

// items management
export const createItem = (data) => api.post("/items", data);
export const updateItem = (id, data) => api.patch(`/items/${id}`, data);
export const deleteItemByUser = (id) => api.delete(`/items/${id}`);
export const deleteItemByAdmin = (id) => api.delete(`/admin/items/${id}`);
export const getAllItemsByUser = (params) => api.get("/items", { params });
export const getAllItemsByAdmin = (params) =>
  api.get("/admin/items", { params });
export const getTotalItemsByAdmin = () => api.get("/admin/items/total");
export const getAllOwnItemsByUser = (params) =>
  api.get("/items/own", { params });
export const getItemById = (id) => api.get(`/items/${id}`);
export const approveItemByAdmin = (id) => api.patch(`/admin/items/${id}/approval`);
export const rejectItemByAdmin = (id, messages) => api.patch(`/admin/items/${id}/reject`, messages);
export const donator = (data) => api.get("/donations", data);

//category
export const getAllCategories = (data) => api.get("/categories", data);
export const getAllItems = (data) => api.get("/items", data);
export const updateCategory = (id, data) =>
  api.put(`/admin/categories/${id}`, data);
export const deleteCategory = (id) =>
  api.delete(`/admin/categories/${id}`, data);
export const createCategory = (data) => api.post("/admin/categories", data);

//donations
export const getTotalAmountDonations = (data) =>
  api.get("/donations/total-amount", data);

//user-account
export const getUser = () => api.get("/users");
export const getAllUsers = (data) => api.get("/admin/users", data);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`, data);

//comments
export const getComment = (id) => api.get(`/item/comments/${id}`);
export const createComment = (id, data) => api.post(`/comments/${id}`, data);
export const updateComment = (id, data) => api.put(`/comments/${id}`, data);
export const deleteComment = (id, data) => api.delete(`/comments/${id}`, data);
export const getCommentByItemId = (id) => api.get(`/item/comments/${id}`);

// notifications
export const getNotificationByUser = (params) =>
  api.get("/notifications", { params });
export const getDetailNotificationById = (id) =>
  api.get(`/notifications/${id}`);
export const setNotificationIsRead = (id) => api.put(`/notifications/${id}`);
export const getNotificationByAdmin = () => api.get("/admin/notifications");
export const setAllNotificationIsRead = () =>
  api.put("/notifications/all/set-read");

// reports
export const createReport = (data) => api.post("/items", data);
