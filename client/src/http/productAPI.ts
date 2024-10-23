import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createCategory = async (category:string) => {
  const {data} = await $authHost.post('api/category/add', category)
  return data
}

export const fetchCategory = async () => {
  const {data} = await $host.get('api/category/')
  return data
}

export const deleteCategory = async (categoryId:string) => {
  const {data} = await $host.post('api/category/del', categoryId)
  return data
}




export const createBrand = async (brand) => {
  const {data} = await $authHost.post('api/brand', brand)
  return data
}

export const fetchBrands = async () => {
  const {data} = await $host.get('api/brand', )
  return data
}

export const createDevice = async (device) => {
  const {data} = await $authHost.post('api/device', device)
  return data
}

export const fetchDevices = async (typeId, brandId, page, limit= 5) => {
  const {data} = await $host.get('api/device', {params: {
      typeId, brandId, page, limit
    }})
  return data
}

export const fetchOneDevice = async (id) => {
  const {data} = await $host.get('api/device/' + id)
  return data
}