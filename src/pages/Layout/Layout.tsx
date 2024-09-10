import Header from "../../components/Header/Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer/Footer.tsx";

interface ILayout {
  burgerState: boolean;
  setBurgerState: (state: boolean) => void;
  loginVisible: boolean;
  setLoginVisible: (state: boolean) => void;
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
}

export default function Layout({burgerState, setBurgerState, loginVisible, setLoginVisible, isLogin, setIsLogin}: ILayout) {
  return (
    <>
      <Header
        burgerState={burgerState}
        setBurgerState={setBurgerState}
        loginVisible={loginVisible}
        setLoginVisible={setLoginVisible}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
      <Outlet/>
      <Footer />
    </>
  )
}