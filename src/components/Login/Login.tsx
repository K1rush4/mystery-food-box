import "./Login.css"
import {useEffect, useRef} from "react";
import {userData} from "../../assets/data.ts";

interface ILogin {
  loginVisible: boolean;
  setLoginVisible: (arg0: boolean) => void;
  setIsLogin: (arg0: boolean) => void;
}

export default function Login({loginVisible, setLoginVisible, setIsLogin}: ILogin) {

  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loginWindow = document.getElementById('loginWindowId');
    if (loginWindow) {
      loginWindow.className = `loginWindow ${loginVisible ? "is-active" : ""}`;
    }
  }, [loginVisible]);

  function handleLoginClose() {
    setLoginVisible(false);
  }

  //Todo отправка формы на сервер и получение токена
  function handleLogin() {
    userData.map((user) => {
      if (loginRef.current!.value ==  user.login && passwordRef.current!.value ==  user.password) {
        setIsLogin(true);
        setLoginVisible(false);
      }
    })
  }



  return (
    <>
      <div id={"loginWindowId"}>
        <div className={"loginCloseButton"}>
          <img src="../../../public/images/close.svg" onClick={handleLoginClose}/>
        </div>
        <div className={"loginWrapper"}>
          <img className={"loginLogoImg"} src="../../../public/images/logo.avif"/>
          <form className={"loginForm"}>
            <div>
              <label htmlFor="login"> Логин: </label>
              <input type="text" id="login" ref={loginRef}/>
            </div>
            <div>
              <label htmlFor="password">Пароль: </label>
              <input type="password" id="password" ref={passwordRef}/>
            </div>
          </form>
          <div className={"loginLoginButton"}>
            <button type="submit" onClick={handleLogin}>Войти</button>
          </div>
          <div className={"loginNoAccNoPass"}>Нет аккаунта? Создать</div>
          <div className={"loginNoAccNoPass"}>Забыли пароль? Восстановить</div>

        </div>
      </div>
      <div className={`loginOverlay ${loginVisible ? "is-active" : ""}`}
           onClick={handleLoginClose}/>
    </>
  )
}