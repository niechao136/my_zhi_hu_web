import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from '@/stores'

const config: AxiosRequestConfig = {
  timeout: 300 * 1000,
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
}

const service = axios.create(config)

const not_need_token: string[] = [
  'server/info',
  'auth/login',
  'user/info',
]

service.interceptors.request.use(config => {
  if (!not_need_token.find(s => config.url?.endsWith(s))) {
    config.headers.Authorization = 'Bearer ' + getToken()
  }
  return config
}, err => {})

service.interceptors.response.use(response => {
  console.log(response)
  return response
}, err => {})

export default service
