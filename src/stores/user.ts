import * as Rx from 'rxjs'

export const login_user$: Rx.BehaviorSubject<User.Info> = new Rx.BehaviorSubject({})

export const setOwner = (user: User.Info) => {
  login_user$.next(user)
}
