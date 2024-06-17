import "./Card.css"

export default function Card() {


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
                <button className={"cardButton"}> В корзину</button>
            </div>
        </div>
    )
}