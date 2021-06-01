import axios from 'axios'

const baseUrl = "http://localhost:3003/api/notes"

//Token for security
let token = null

//Assigning/changing the token
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    //return request.then(request => request.data)
    return request.then(response => response.data)
}

//Creating a new note service
const createNote = async (newNote) => {
    //Creates an object header with header containing authorization entry and token
    const config = {
        headers: { Authorization: token},
    }
    
    //Post note and configured headers to login url
    console.log(config)
    const response = await axios.post(baseUrl, newNote, config)
    return response.data
}

//Updating a note
const updateNote = (updatedNote, id) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedNote)
    return request.then(request => request.data)
}

const deleteNote = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(request => request.data)
}


export default {getAll, createNote, updateNote, deleteNote, setToken} 