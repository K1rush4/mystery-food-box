import ButtonToCart from "../../components/ButtonToCart/ButtonToCart.tsx";
import {useEffect, useState} from "react";
import {setToCart} from "../../http/basketAPI.ts";
import {fetchOneProduct} from "../../http/productAPI.ts";

interface ICartItem {
  basketId: number;
  productId: number;
  productCounter: number;
  // checked: boolean;
  // onCheckChange: (checked: boolean) => void;
}

interface ICard {
  name: string;
  price: string;
  img: string;
}

// export default function CartItem({productId, checked, onCheckChange}: ICartItem) {
export default function CartItem({basketId, productId, productCounter}: ICartItem) {
  const [card, setCard] = useState<ICard>();
  const [counter, setCounter] = useState<number>(1);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const basketId = localStorage.getItem('basketId')
        if (basketId) {
          const oneProduct = await fetchOneProduct(productId)
          setCard(oneProduct);
        }
        setCounter(productCounter)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCart();
  }, []);

  const quantityPlus = async () => {
    const res = await setToCart(basketId, productId, 1)
    if (res === "succeed") {
      setCounter(counter + 1)
    }
  }

  const quantityMinus = async () => {
    if (counter > 2) {
      const res = await setToCart(basketId, productId, -1)
      if (res === "succeed") {
        setCounter(counter - 1)
      }
      //ToDO
      // else {
      //   const res = await
      // }
    }
  }

  return (
    <div className={"group flex gap-7 min-h-[110px]"}>
      <div className="relative w-2/6 max-w-[150px]">
        <div className={"absolute top-1 left-1"}>
          {/*<CustomCheckBox*/}
          {/*  checked={checked}*/}
          {/*  onChange={(event) => onCheckChange(event.target.checked)}*/}
          {/*/>*/}
        </div>
        <img className={"w-full"} src="/images/card-img.png"/>
      </div>
      <div className={"w-3/6  flex xl:hidden  flex-col justify-between md:pb-6"}>
        <div className={"text-2xl md:text-3xl"}>{card?.name}</div>
        <ButtonToCart
          quantityInCart={counter}
          quantityPlus={quantityPlus}
          quantityMinus={quantityMinus}
          style={"cart"}/>
      </div>
      <div className={"xl:hidden w-1/6 text-xl md:text-2xl flex flex-col justify-between items-end md:pb-6"}>
        <img className={"w-[25px] h-[25px] opacity-0 group-hover:opacity-30 hover:!opacity-100"} id={"trash"}
             src="/images/trash.png"/>
        <div>{card?.price} р.</div>
      </div>
      <div className={"hidden xl:block w-full h-full"}>
        <div className={"flex w-full h-full justify-between items-center"}>
          <div className={"text-4xl  items-center"}>{card?.name}</div>
          <div className={"self-start flex items-center"}>
            <ButtonToCart
              quantityInCart={counter}
              quantityPlus={quantityPlus}
              quantityMinus={quantityMinus}
              style={"cart"}
            />
          </div>
          <div className={"text-2xl"}>{card?.price} р.</div>
        </div>
        <img className={"mt-2 w-[25px] h-[25px] opacity-0 group-hover:opacity-30 hover:!opacity-100"}
             id={"trash"}
             src="/images/trash.png"/>
      </div>
    </div>
  )
}

