import {$authHost} from "./index";

export const setToCart = async (basketId:number, productId: number, counter: number) => {
  const {data} = await $authHost.post('api/basket/set', {basketId, productId, counter})
  return data
}

export const itemsInCart = async (basketId:string) => {
  const {data} = await $authHost.post('api/basket/', {basketId})
  return data
}