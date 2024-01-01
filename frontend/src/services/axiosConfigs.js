// configs for API layer
import axios from 'axios';

// initializing the axios instance with the base url of the backend api
const instance = axios.create({
   baseURL: 'http://localhost:8000',
});

export default instance;