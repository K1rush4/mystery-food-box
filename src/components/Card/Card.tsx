import "./Card.css"
import ButtonToCart from "../ButtonToCart/ButtonToCart.tsx";
import {useState} from "react";

export default function Card() {
  const [itemInCard, setItemInCard] = useState(0);

    return (
        <div className={"cardWrapper"}>
            <div className={"cardImgWrapper"}>
                <img src="public/images/card-img.png" className={"cardImg"} />
            </div>
            <div>
                <div className={"cardMainText"}>Завтрак маленький</div>
                <div className={"cardSecondText"}>Состоит из:</div>
            </div>
            <div className={"cardPriceToCard"}>
                <div>499 р.</div>
                {/*<button className={"cardButton"}> В корзину</button>*/}
              <ButtonToCart
                itemInCard={itemInCard}
                setItemInCard={setItemInCard}
                inMainPage={true} />
            </div>
        </div>
    )
}