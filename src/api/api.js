import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:9000/api/v1", // URL backend Anda
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
