// configs for API layer
import axios from "axios";

// initializing the axios instance with the base url of the backend api
const instance = axios.create({
  baseURL: "http://localhost:8000",
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("authTokens");
  let access = null;
  if (token) {
    access = JSON.parse(token).access;
  }
  config.headers.Authorization =  access;
   
  return config;
});

export default instance;
