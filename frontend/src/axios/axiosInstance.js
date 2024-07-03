import axios from "axios";
import { store } from "../store/store";
import { startLoading, stopLoading } from "../redux/loading/index.slice";

export const getReduxToken = () => {
  return store.getState().token.token || "";
};

const getToken = () => {
  return localStorage.getItem("authToken") || getReduxToken() || "";
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    store.dispatch(startLoading());
    const updatedToken = getToken();
    if (
      updatedToken &&
      updatedToken !== config.headers.Authorization?.split(" ")[1]
    ) {
      config.headers.Authorization = `Bearer ${updatedToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(stopLoading());
    return response;
  },
  (error) => {
    store.dispatch(stopLoading());
    return Promise.reject(error);
  }
);

export default axiosInstance;
