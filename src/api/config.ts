import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Modal } from 'antd'
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
  'user/register',
]

service.interceptors.request.use(config => {
  if (!not_need_token.find(s => config.url?.endsWith(s))) {
    config.headers.Authorization = getToken()
  }
  return config
}, err => {})

service.interceptors.response.use((response: AxiosResponse<Result.Base>) => {
  if (response.data?.status === 400) {
    location.href = '/login'
    return Promise.reject(response.data)
  } else if (response.data?.status === 401) {
    Modal.warn({
      title: '用户异常',
      content: '用户已登出，请重新登入',
      okText: '回到登入页',
      cancelText: '',
      onOk() {
        location.href = '/login'
      }
    })
    return Promise.reject(response.data)
  }
  return response
}, err => {})

export default service
