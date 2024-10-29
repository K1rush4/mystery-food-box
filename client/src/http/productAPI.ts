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

export const createProduct = async (name: string, price: string, categoryId: string, img: File) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('categoryId', categoryId);
  formData.append('img', img);
  const {data} = await $authHost.post('api/product/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

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

export const createProductInfo = async (consist:string, description:string, productId: string) => {
  const {data} = await $authHost.post('api/productInfo/add', {consist, description, productId})
  return data
}

export const fetchProductInfo = async (productId: number) => {
  const {data} = await $host.get('api/productInfo?productId=' + productId)
  return data
}

export const deleteProductInfo = async (productId:string) => {
  const {data} = await $authHost.post('api/productInfo/delete', {productId})
  return data
}