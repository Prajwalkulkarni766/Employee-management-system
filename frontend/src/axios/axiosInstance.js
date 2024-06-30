import axios from "axios";
import { store } from "../store/store";

export const getReduxToken = () => {
  return store.getState().token.token || "";
};

const getToken = () => {
  return localStorage.getItem("authToken") || getReduxToken() || "";
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Authorization: `Bearer ${getToken()}`, // Use getToken function
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const updatedToken = getToken(); // Get updated token again
    if (
      updatedToken &&
      updatedToken !== config.headers.Authorization.split(" ")[1]
    ) {
      // Check against existing token
      config.headers.Authorization = `Bearer ${updatedToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
