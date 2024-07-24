import * as Rx from 'rxjs'
import { COOKIE, getCookie, setCookie } from '@/utils'

export const login_token$: Rx.BehaviorSubject<string> = new Rx.BehaviorSubject('')

export const initToken = () => {
  const cookie = getCookie(COOKIE.TOKEN)
  if (!!cookie) {
    login_token$.next(cookie)
  }
}

export const getToken = () => {
  return login_token$.getValue()
}

export const setToken = (token: string) => {
  setCookie(COOKIE.TOKEN, token)
  login_token$.next(token)
}
