import axios, {InternalAxiosRequestConfig} from "axios";

const $host = axios.create({
  // baseURL: process.env.REACT_APP_API_URL
  baseURL: "http://localhost:5000",
})

const $authHost = axios.create({
  // baseURL: process.env.REACT_APP_API_URL
  baseURL: "http://localhost:5000",
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers = config.headers || {};
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
  $host,
  $authHost
}