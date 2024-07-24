
declare namespace Result {
  type Base = {
    status?: number
    success?: string
  }
  type Msg<T = string> = Base & {
    msg?: string
    data?: T
  }
  type Page<T = string> = Base & {
    page?: number
    row?: T[]
    size?: number
    total?: number
  }
}
