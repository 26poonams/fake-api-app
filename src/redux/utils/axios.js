import axios from "axios";

const baseURLs = {
  development: "http://localhost:3000",
};

const axiosInstance = axios.create({ baseURL: baseURLs.development });

axiosInstance.interceptors.request.use((config) => {
  const environment = process.env.NODE_ENV || "development";
  config.baseURL = baseURLs[environment];
  return config;
});

export default axiosInstance;
