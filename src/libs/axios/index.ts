import axios from 'axios'
import { BASE_URL } from '@/config'
import { GetCookie } from '@/libs/cookie'

export const $http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    common: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${GetCookie('Bicard-Web-API-Access-Token')}`,
    },
  },
})
