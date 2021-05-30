import axios from 'axios'

const baseUrl = "http://localhost:3003/api/notes"

const getAll = () => {
    const request = axios.get(baseUrl)
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

const deleteNote = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(request => request.data)
}


export default {getAll, createNote, updateNote, deleteNote} 