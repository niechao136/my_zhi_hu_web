import * as Rx from 'rxjs'

export const loading_array$: Rx.BehaviorSubject<string[]> = new Rx.BehaviorSubject([] as string[])

export const startLoading = (key: string) => {
  const array = loading_array$.getValue()
  loading_array$.next(array.concat([key]))
}

export const stopLoading = (key: string) => {
  const array = loading_array$.getValue()
  loading_array$.next(array.filter(o => o !== key))
}

export const closeLoading = () => {
  loading_array$.next([])
}
