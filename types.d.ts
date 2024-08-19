
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
    data?: T[]
    size?: number
    total?: number
  }
}

declare namespace User {
  type Info = {
    id?: number
    username?: string
    nickname?: string
  }
  type Register = {
    username?: string
    password?: string
    role?: number
    nickname?: string
    email?: string
    phone?: string
  }
}

declare namespace Question {
  type Add = {
    title?: string
    content?: string
  }
  type Info = {
    title?: string
    content?: string
    id?: number
    owner_id?: number
    answers?: number[]
    watching?: number[]
    create_at?: string
    update_at?: string
    user?: User.Info
  }
}
