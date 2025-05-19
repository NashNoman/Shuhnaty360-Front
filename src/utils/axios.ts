import axios from "axios";
import { baseURL } from "../../config";

const api = axios.create({
  baseURL: `${baseURL}/api/`,
  auth: {
    username: "admin",
    password: "admin",
  },
});

export default api;
