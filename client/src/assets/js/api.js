import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bookrecip-e5a5d3bc5103.herokuapp.com/",
});
export default axiosInstance;
