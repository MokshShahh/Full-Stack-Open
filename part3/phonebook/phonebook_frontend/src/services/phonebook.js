import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getAll = () => {
  console.log("reached get function")
  return axios.get(baseUrl+'/api/persons')
}

const create = newObject => {
  return axios.post(baseUrl+'/api/persons', newObject)
}

const remove = id =>{
    return axios.delete(`${baseUrl}/api/persons/${id}`)
}


  
  



export default { 
  getAll: getAll, 
  create: create,
  remove: remove,

}