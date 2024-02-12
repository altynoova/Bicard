export type UserRegister = {
  userName: string
  email: string
  password: string
}

export type UserLogin = {
  userName: string
  password: string
  rememberMe: boolean
}

export type User = {
  userId: number
  userName: string
  roleName: string
  accessToken: string
  message: string
}
