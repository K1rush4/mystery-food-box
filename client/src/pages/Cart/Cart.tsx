import CartItem from "./CartItem.tsx";
import CustomCheckBox from "../../components/CustomCheckBox/CustomCheckBox.tsx";
import React, {useEffect, useState} from "react";
import {itemsInCart} from "../../http/basketAPI.ts";

interface ICart{
  id:number;
  productCounter:number;
  basketId: number;
  productId:number;
  createdAt: string;
  updatedAt: string;
}

export default function Cart() {
  const [allChecked, setAllChecked] = useState(false);
  const [itemsChecked, setItemsChecked] = useState<boolean[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);
  const [data, setData] = useState<ICart[]>([]);

  useEffect(() => {
    //ToDo отдельно брать число 4 с сервера в useEffect
    setItemCount(4)
    if (itemCount > 0) {
      setItemsChecked(new Array(itemCount).fill(false));
    }
  }, [itemCount]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const basketId = localStorage.getItem('basketId')
        if (basketId) {
          const res = await itemsInCart(basketId)
          setData(res);
          console.log(res);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCart();
  }, []);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedState = event.target.checked;
    setAllChecked(newCheckedState);
    setItemsChecked(itemsChecked.map(() => newCheckedState));
  };

  const handleItemChange = (index: number, checked: boolean) => {
    const newItemsChecked = [...itemsChecked];
    newItemsChecked[index] = checked;
    setItemsChecked(newItemsChecked);
    setAllChecked(newItemsChecked.every(item => item));
  };

  return (
    <main className={"p-[3%]"}>
      <div className={"bg-white p-7 md:p-9 xl:p-12 rounded-[25px]"}>

        <div className={"flex items-end gap-3 mb-3"}>
          <div className={"text-2xl"}><b>Корзина</b></div>
          <div className={"text-gray-400"}>
            {itemCount} {itemCount === 1 ? "товар" : itemCount >= 2 && itemCount <= 4 ? "товара" : "товаров"}
          </div>
        </div>

        <div className={"flex gap-3 pl-1"}>
          <CustomCheckBox
            checked={allChecked}
            onChange={handleSelectAll}
          />
          <div className={"mb-7"}>Выбрать все</div>
        </div>

        <div className={"space-y-7"}>
          {/*{itemsChecked.map((checked, index) => (*/}
          {/*  <CartItem*/}
          {/*    key={index}*/}
          {/*    productId={}*/}
          {/*    checked={checked}*/}
          {/*    onCheckChange={(newChecked) => handleItemChange(index, newChecked)}*/}
          {/*  />*/}
          {/*))}*/}
          {data && data.map((item, index) => (
            <CartItem
              key={index}
              basketId = {item.basketId}
              productId={item.productId}
              productCounter={item.productCounter}
            />
          ))}
        </div>
      </div>
    </main>
  )
}