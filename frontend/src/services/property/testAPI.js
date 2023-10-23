import axios from "services/axiosConfigs";
const baseURL = "/properties";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => shuffle(response.data));
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => { 
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then((response) => response.data);
}

const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

const propertyService = {
  getAll: getAll,
  create: create,
  update: update,
};
export default propertyService;