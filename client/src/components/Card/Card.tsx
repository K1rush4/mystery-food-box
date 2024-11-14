import "./Card.css"
import ButtonToCart from "../ButtonToCart/ButtonToCart.tsx";
import {useState} from "react";

interface ICard {
  name: string;
  price: string;
  img: string;
}

export default function Card({name, price, img}: ICard) {
  const [itemInCard, setItemInCard] = useState(0);


  // const imageUrl = `${REACT_APP_API_URL}/${img}`;
  const imageUrl = `http://localhost:5000/${img}`;

    return (
        <div className={"cardWrapper"}>
            <div className={"cardImgWrapper"}>
                <img src={imageUrl} className={"cardImg"} />
            </div>
            <div>
                <div className={"cardMainText"}>{name}</div>
                {/*<div className={"cardSecondText"}>Состоит из: {consist}</div>*/}
            </div>
            <div className={"cardPriceToCard"}>
                <div>{price} р.</div>
              <ButtonToCart
                itemInCard={itemInCard}
                setItemInCard={setItemInCard}
                style={"main"} />
            </div>
        </div>
    )
}