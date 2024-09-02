import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = id =>{
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, num) => {
    return axios.get(`${baseUrl}/${id}`)
      .then(response => {
        const user = response.data; // Extract user data
        return axios.put(`${baseUrl}/${id}`, { ...user, number: num });
        

      });
  };
  
  



export default { 
  getAll: getAll, 
  create: create,
  remove: remove,
  update: update
}