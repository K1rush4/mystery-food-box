import "./Header.css"
import Login from "../Login/Login.tsx";
import {Link} from "react-router-dom";
import {useEffect} from "react";

interface IHeader {
  burgerState: boolean;
  setBurgerState: (state: boolean) => void;
  loginVisible: boolean;
  setLoginVisible: (state: boolean) => void;
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
}

export default function Header({burgerState, setBurgerState, loginVisible, setLoginVisible, isLogin, setIsLogin}: IHeader) {

  useEffect(() => {
    setLoginVisible(false)
  }, []);

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
        <div className={"headerBlock"}>
          <div className={"headerLogoBlock"}>
            <img src="../../../public/images/hamburger.svg" className={"headerBurger"} onClick={handlerBurgerClick}/>
            <a href={"/"}>
              <div className={"headerNameToMain"}>
                <img className={"headerLogoImg"} src="../../../public/images/logo.avif"/>
                <div className={"headerLogoText"}>Mistery foooood box</div>
              </div>
            </a>
          </div>
          <nav className={"headerNav"}>
            <div>Меню</div>
            <div>Доставка</div>
            <div>О нас</div>
            <Link to={"/cart"}>
              <img src="../../../public/images/cart_575j31cg09aj.svg" className={"basketImg"}/>
            </Link>

            {isLogin ?
              <Link to={"/profile"}>
                <img className={"loginButtonImg"} src="../../../public/images/login2.svg"/>
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
      <Login loginVisible={loginVisible} setLoginVisible={setLoginVisible} setIsLogin={setIsLogin}/>
    </>

  )
}