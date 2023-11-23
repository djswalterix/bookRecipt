import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://bookrecip-e5a5d3bc5103.herokuapp.com/",
});

export default axiosInstance;
