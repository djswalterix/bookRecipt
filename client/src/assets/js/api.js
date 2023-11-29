import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://book-receipt-1.lm.r.appspot.com/",
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
