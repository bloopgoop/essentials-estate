import axios from "services/axiosConfigs";
const baseURL = "/property";

// API layer for property related requests
// Turn all these into async functions and return the data directly instead of promises

// returns response instead of response.data
const getRange = (start, end) => {
  const request = axios.get(`${baseURL}/?start=${start}&end=${end}`);
  return request.then((response) => response);
};

const getOne = (id) => {
  const request = axios.get(`${baseURL}/${id}`);
  return request.then((response) => response);
};

const create = (newObject) => {
  const request = axios.post(`${baseURL}/`, newObject);
  return request.then((response) => response.data);
};

const addPhoto = (newObject) => {
  const request = axios.post(`${baseURL}/photo/`, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((response) => response.data);
};

const getPropertyRentalStatus = (id) => {
  const request = axios.get(`${baseURL}/requestRental/${id}/`);
  return request.then((response) => response);
};

const requestPropertyRental = (id) => {
  const request = axios.post(`${baseURL}/requestRental/${id}/`);
  return request.then((response) => response.data);
};

const propertyService = {
  getRange,
  getOne,
  create,
  update,
  addPhoto,
  requestPropertyRental,
  getPropertyRentalStatus,
};
export default propertyService;
