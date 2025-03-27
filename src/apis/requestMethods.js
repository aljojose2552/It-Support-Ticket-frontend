import axios from "axios";


const BASE_URL="http://localhost:3000/api"

const getToken = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        resolve(token);
      }, 1000);
    });
  };
  
  export const publicRequest = axios.create({
    baseURL: BASE_URL,
  });
  
  export const userRequset = axios.create({
    baseURL: BASE_URL,
  });
  
  userRequset.interceptors.request.use(async (config) => {
    const token = await getToken();
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });