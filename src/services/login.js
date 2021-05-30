import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials)
    console.log('i work :< ')
    return response.data
}

export default { login }