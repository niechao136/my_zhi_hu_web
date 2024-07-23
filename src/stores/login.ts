import * as Rx from 'rxjs'
import { COOKIE, getCookie } from '@/utils'

export const login_token$: Rx.BehaviorSubject<string> = new Rx.BehaviorSubject('')

export const initToken = () => {
  const cookie = getCookie(COOKIE.TOKEN)
  if (!!cookie) {
    setToken(cookie)
  }
}

export const getToken = () => {
  return login_token$.getValue()
}

export const setToken = (token: string) => {
  login_token$.next(token)
}
