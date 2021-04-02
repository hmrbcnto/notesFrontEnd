import axios from 'axios'

const baseUrl = "http://localhost:3001/api/notes"

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log(request.data)
    //return request.then(request => request.data)
    return request.then(response => response.data)
}

const createNote = noteObject => {
    const request = axios.post(baseUrl, noteObject)
    return request.then(request => request.data)

}

const updateNote = (updatedNote, id) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedNote)
    return request.then(request => request.data)
}


export default {getAll, createNote, updateNote}