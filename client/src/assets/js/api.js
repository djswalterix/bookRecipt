import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: "https://bookrecip-e5a5d3bc5103.herokuapp.com/",
  baseURL: "http://localhost:3000/",
});
export default axiosInstance;
