import axios from "axios";

const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get('http://localhost:3001/persons').then(response => response.data)
const create = (person) => axios.post('http://localhost:3001/persons/', person).then(response => response.data).catch(console.log('bruh'))
//the error we had earlier was using put instead of post, now try to fix the rest later
export default {getAll, create}

