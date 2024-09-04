import Header from "../../components/Header/Header.tsx";
import {useState} from "react";
import ButtonToCart from "../../components/ButtonToCart/ButtonToCart.tsx";

//TODo добавить уведомление "Добавлено в корзину или типа того"
export default function Product() {
  const [burgerState, setBurgerState] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [itemInCard, setItemInCard] = useState(0);

  const compositionInfo = `В бокс включены следующие блюда: бла-бла-бла`;
  const addInfo = `Дополнительная информация о карточке:\nТекст\nТекст\nЕще текст`;

  return (
    <>
      <Header burgerState={burgerState}
              setBurgerState={setBurgerState}
              loginVisible={loginVisible}
              setLoginVisible={setLoginVisible}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
      />
      <main className={"p-[3%]"}>
        <div className={"bg-white p-7 md:p-9 xl:p-12 rounded-[25px]"}>
          <div className={"flex gap-7 md:gap-9 xl:gap-12 mb-8"}>
            <img className={"w-1/2 max-w-[500px]"} src="public/images/card-img.png"/>
            <div className={"w-1/2 flex flex-col justify-between"}>
              <div>
                <div className={"text-3xl md:text-5xl xl:text-6xl mb-8"}>Заголовок карточки</div>
                <div className={"hidden md:block whitespace-pre-wrap my-3 "}>
                  {compositionInfo}
                </div>
              </div>
              <div className={"space-y-3 md:space-y-6"}>
                <div className={"text-xl md:text-3xl xl:text-4xl"}>499р</div>
                <ButtonToCart
                  itemInCard={itemInCard}
                  setItemInCard={setItemInCard}
                  inMainPage={false}
                />
              </div>
            </div>
          </div>
          <div className={"whitespace-pre-wrap my-3 md:hidden"}>
            {compositionInfo}
          </div>
          <div className={"whitespace-pre-wrap"}>
            {addInfo}
          </div>
        </div>
      </main>
    </>

  )
}
