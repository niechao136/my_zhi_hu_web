import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const config: AxiosRequestConfig = {
  timeout: 300 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
}

const service = axios.create(config)

service.interceptors.request.use(config => {
  return config
}, err => {})

service.interceptors.response.use(response => {
  return response.data
}, err => {})

export default service
