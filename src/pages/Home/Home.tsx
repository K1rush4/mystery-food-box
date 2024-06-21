import "./Home.css"
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import Card from "../../components/Card/Card";
import {useState} from "react";

interface IHome {
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
}

export default function Home({isLogin, setIsLogin}: IHome) {
  const [burgerState, setBurgerState] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false);

  return (
    <>
      <Header burgerState={burgerState}
              setBurgerState={setBurgerState}
              loginVisible={loginVisible}
              setLoginVisible={setLoginVisible}
              isLogin={isLogin}
              setIsLogin={setIsLogin}/>
      <main className={"homeMain"}>
        <Menu burgerState={burgerState} setBurgerState={setBurgerState}/>
        <div className={"contentWindow"}>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </main>
    </>
  )
}
