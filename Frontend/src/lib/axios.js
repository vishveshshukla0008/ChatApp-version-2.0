import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://pingme-chatapp-1-kjr4.onrender.com/api",
  withCredentials: true,
});
