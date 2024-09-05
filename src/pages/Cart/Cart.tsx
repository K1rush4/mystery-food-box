import Header from "../../components/Header/Header.tsx";
import {useState} from "react";

export default function Cart() {
  const [burgerState, setBurgerState] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Header burgerState={burgerState}
              setBurgerState={setBurgerState}
              loginVisible={loginVisible}
              setLoginVisible={setLoginVisible}
              isLogin={isLogin}
              setIsLogin={setIsLogin}/>
    </>
  )
}