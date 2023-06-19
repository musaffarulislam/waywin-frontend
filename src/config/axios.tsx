import axios from 'axios';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const baseURL = "http://localhost:4000";

const axiosInstance= axios.create({
    baseURL
})

export default axiosInstance

axiosInstance.interceptors.request.use(
    config => {
      const token = window.localStorage.getItem('accessToken')
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
      }
      // config.headers['Content-Type'] = 'application/json';
      return config
    },
    error => {
      Promise.reject(error)
    }
  )


axiosInstance.interceptors.response.use(
    response => {
      return response
    },
    function (error) {
      const originalRequest = error.config
  
      if ( error.response.status === 401 && originalRequest.url === baseURL+'/api/auth/token' ) {
        <Navigate to="/login" />
        return Promise.reject(error)
      }
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = useSelector((state:any) => state.auth.refreshToken)
        return axios
          .post('/auth/token', {
            refresh_token: refreshToken
          })
          .then(res => {
            if (res.status === 201) {
                window.localStorage.setItem('accessToken',JSON.stringify(res.data.accessToken))
              axios.defaults.headers.common['Authorization'] =
                'Bearer ' + window.localStorage.getItem('accessToken')
              return axios(originalRequest)
            }
          })
      }
      return Promise.reject(error)
    }
  )