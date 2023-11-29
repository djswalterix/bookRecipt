import axios from "axios";
const dotenv = require("dotenv");
dotenv.config();
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //baseURL: "http://localhost:3000",
});
/*
axiosInstance.interceptors.request.use(
  (config) => {
    const excludeUrls = ["/api/auth/login", "/api/users"];
    const tokenTimestamp = localStorage.getItem("tokenTimestamp");
    const currentTime = Date.now();
    if (excludeUrls.includes(config.url)) {
      return config;
    }
    if (currentTime - tokenTimestamp > 3600000) {
      // Token scaduto, puoi reindirizzare all'accesso o rinnovare il token
      // Esempio: reindirizzamento al login
      window.location.href = "/sign-in";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);*/

export default axiosInstance;
