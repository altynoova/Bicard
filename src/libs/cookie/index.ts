import Cookies from 'js-cookie'

export const GetCookie = (name: string) => {
  return Cookies.get(name)

}

export const SetCookie = (name: string, value: string) => {
  Cookies.set(name, value)
}

export const RemoveCookie = (name: string) => {
  Cookies.remove(name)
}