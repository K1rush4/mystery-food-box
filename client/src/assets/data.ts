import {IMenuItem, IUserData} from "../interfaces";

export const menuList: IMenuItem[] = [
  {
    text: "Загадочный завтрак",
    url: "breakfast",
  },
  {
    text: "Комплексный обед",
    url: "lunch",
  },
  {
    text: "Тайный ужин",
    url: "dinner",
  },
  {
    text: "Случайная пицца",
    url: "random_pizza",
  },
  {
    text: "Случайный сет роллов",
    url: "random_sushi",
  }
]

export const userData: IUserData[] = [
  {
    login: "admin",
    password: "admin",
  },
  {
    login: "user",
    password: "user",
  },
]
