import "./Header.css"
import Login from "../Login/Login.tsx";
import {Link} from "react-router-dom";
import Burger from "../Burger/Burger.tsx";
import {useContext, useState} from "react";
import {LoginContext} from "../../App.tsx";

export default function Header() {
  const [burgerState, setBurgerState] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false);

  const {isLogin, isAdmin} = useContext(LoginContext);

  function handlerBurgerClick() {
    setBurgerState(!burgerState)
  }

  function handleLoginClick() {
    if (!isLogin) {
      setLoginVisible(true);
    }
  }

  return (
    <>
      <header className={"wrapperHeader"}>
        <Burger burgerState={burgerState} setBurgerState={setBurgerState}/>
        <div className={"headerBlock"}>
          <div className={"headerLogoBlock"}>
            <img src="../../../public/images/hamburger.svg" className={"headerBurger"} onClick={handlerBurgerClick}/>
            <Link to={'/'}>
              <div className={"headerNameToMain"}>
                <img className={"w-[60px] md:w-[70px] xl:w-[100px] h-[60px] md:h-[70px] xl:h-[100px]"}
                     src="../../../public/images/logo.avif"/>
                <div className={"headerLogoText"}>Mistery foooood box</div>
              </div>
            </Link>
          </div>
          <nav className={"headerNav"}>
            {isAdmin &&
              <Link to={"/admin"}>
                <div>Админ панель</div>
              </Link>
            }
            <div>Меню</div>
            <div>Доставка</div>
            <div>О нас</div>
            <Link to={"/cart"}>
              <img src="../../../public/images/cart_575j31cg09aj.svg" className={"basketImg"}/>
            </Link>

            {isLogin ?
              <Link to={"/profile"}>
                <img className={"loginButtonImg2"} src="../../../public/images/login2.svg"/>
              </Link>
              :
              <button className={"loginButton"} onClick={handleLoginClick}>
                <img className={"loginButtonImg"} src="../../../public/images/login.svg"/>
                <span>Войти</span>
              </button>
            }
          </nav>
        </div>
      </header>
      <Login loginVisible={loginVisible} setLoginVisible={setLoginVisible}/>
    </>

  )
}