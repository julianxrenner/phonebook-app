import axios from "axios";

const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get('http://localhost:3001/persons').then(response => response.data)
const create = (person) => axios.post('http://localhost:3001/persons/', person).then(response => response.data)
const deleteContact = (id) => axios.delete(`http://localhost:3001/persons/${id}`)

export default {getAll, create, deleteContact}

