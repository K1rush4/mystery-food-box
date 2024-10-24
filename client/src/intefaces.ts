export interface MenuListItem {
  id:number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  img?: string;
  created_at: string;
  updated_at: string;
  "categoryId": number;
}