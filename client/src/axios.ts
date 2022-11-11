import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8095",
  withCredentials: true,
});

export default instance;
