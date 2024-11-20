import ButtonToCart from "../../components/ButtonToCart/ButtonToCart.tsx";
import {useState} from "react";
import CustomCheckBox from "../../components/CustomCheckBox/CustomCheckBox.tsx";

interface ICartItem {
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
}

export default function CartItem({checked, onCheckChange}: ICartItem) {
  const [itemInCard, setItemInCard] = useState(1);

  return (
    <div className={"group flex gap-7 min-h-[110px]"}>
      <div className="relative w-2/6 max-w-[150px]">
        <div className={"absolute top-1 left-1"}>
          <CustomCheckBox
            checked={checked}
            onChange={(event) => onCheckChange(event.target.checked)}
          />
        </div>
        <img className={"w-full"} src="/images/card-img.png"/>
      </div>
      <div className={"w-3/6  flex xl:hidden  flex-col justify-between md:pb-6"}>
        <div className={"text-2xl md:text-3xl"}>Комплексный обед</div>
        <ButtonToCart itemInCard={itemInCard} setItemInCard={setItemInCard} style={"cart"}/>
      </div>
      <div className={"xl:hidden w-1/6 text-xl md:text-2xl flex flex-col justify-between items-end md:pb-6"}>
        <img className={"w-[25px] h-[25px] opacity-0 group-hover:opacity-30 hover:!opacity-100"} id={"trash"}
             src="/images/trash.png"/>
        <div>499 Р</div>
      </div>
      <div className={"hidden xl:block w-full h-full"}>
        <div className={"flex w-full h-full justify-between items-center"}>
          <div className={"text-4xl  items-center"}>Комплексный обед</div>
          <div className={"self-start flex items-center"}>
            <ButtonToCart
              itemInCard={itemInCard}
              setItemInCard={setItemInCard}
              style={"cart"}
            />
          </div>
          <div className={"text-2xl"}>499 Р</div>
        </div>
        <img className={"mt-2 w-[25px] h-[25px] opacity-0 group-hover:opacity-30 hover:!opacity-100"}
             id={"trash"}
             src="/images/trash.png"/>
      </div>
    </div>
  )
}

