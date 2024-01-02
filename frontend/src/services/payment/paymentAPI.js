import axios from "services/axiosConfigs"; // localhost:3001 specified in axiosConfigs.js
const baseURL = "/api/users"; // localhost:3001/payment
// Turn all these into async functions and return the data directly instead of promises

// POST request to backend to add a method of payment
const upload = (formData) => {
  const request = axios.post(`${baseURL}/payment/`, formData);
  return request.then((response) => response.data);
};

const paymentService = { upload };
export default paymentService;
