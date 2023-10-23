// configs for API layer
import axios from 'axios';

// initializing the axios instance with the base url of the backend api
const instance = axios.create({
   baseURL: 'http://localhost:3001',
});

export default instance;
