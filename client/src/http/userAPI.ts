import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

interface IToken {
  id: number;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export const registration = async (name:string, surname:string, email:string, phone:string, address:string, password:string, role:string) => {
  const {data} = await $host.post('api/user/registration', {name, surname, email, phone, password, address, role})
  localStorage.setItem('token', data.token)
  localStorage.setItem('basketId', data.basketId)
  console.log(data.token)
  console.log(data.basketId)
  return data
}

export const login = async (email:string, password:string): Promise<IToken> => {
  const {data} = await $host.post('api/user/login', {email, password})
  localStorage.setItem('token', data.token)
  localStorage.setItem('basketId', data.basket.id)
  console.log(data.token)
  console.log(data.basket.id)
  return jwtDecode(data.token)
}

export const check = async () => {
  const {data} = await $authHost.get('api/user/auth' )
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}