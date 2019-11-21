import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://34.87.22.254',
  headers: {
    access_token: localStorage.getItem('access_token')
  }
})

export default axiosInstance
