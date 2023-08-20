import axios from "axios";
import * as StorageService from "../../services/storage.service";

const API_URL = process.env.REACT_APP_API_URL;

const http = axios.create({
  baseURL: API_URL,
});

//Request interceptor
http.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";

    const token: string | null = StorageService.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

//Response interceptor
http.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default http;
