import {$authHost, $host} from "./index";

export const createCategory = async (name:string) => {
  const {data} = await $authHost.post('api/category/add', {name})
  return data
}

export const fetchCategory = async () => {
  const {data} = await $host.get('api/category/')
  return data
}

export const deleteCategory = async (id:string) => {
  const {data} = await $authHost.post('api/category/del', {id})
  return data
}

//ToDO
export const createProduct = async (name:string) => {
  const {data} = await $authHost.post('api/category/add', {name})
  return data
}

export const fetchAllProducts = async () => {
  const {data} = await $host.get('api/product')
  return data
}

export const fetchProductsInCategory = async (id:string) => {
  const {data} = await $host.get('api/product?categoryId=' + id)
  return data
}

export const fetchOneProduct = async (id:string) => {
  const {data} = await $host.get('api/product/' + id)
  return data
}

export const deleteProduct = async (id:string) => {
  const {data} = await $authHost.post('api/product/delete', {id})
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