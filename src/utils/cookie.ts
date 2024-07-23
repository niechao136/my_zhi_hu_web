import Cookie from 'js-cookie'

export const getCookie = (key: string) => Cookie.get(key)

export const setCookie = (key: string, value: string, expires: number = 1) =>
  Cookie.set(key, value, { expires })

export const rmCookie = (key: string) => Cookie.remove(key)
