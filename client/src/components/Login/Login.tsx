import "./Login.css"
import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {login} from "../../http/userAPI.ts";

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

  async function handleLogin() {
    const token = await login(loginRef.current!.value, passwordRef.current!.value)
    if (token) {
      setIsLogin(true)
      setLoginVisible(false);
    }
  }

  return (
    <>
      <div id={"loginWindowId"} style={{ display: loginVisible ? "block" : "none" }}>
        <div className={"loginCloseButton"}>
          <img src="../../../public/images/close.svg" onClick={handleLoginClose}/>
        </div>
        <div className={"loginWrapper"}>
          <img className={"loginLogoImg"} src="../../../public/images/logo.avif"/>
          <form className={"loginForm"}>
            <div>
              <label htmlFor="login"> Email: </label>
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
          <div className={"loginNoAccNoPass"}>Нет аккаунта?&nbsp;
            <Link to={"/reg"}>
              <u onClick={handleLoginClose}>Создать</u>
            </Link>
          </div>
          <div className={"loginNoAccNoPass"}>Забыли пароль?&nbsp;<u>Восстановить</u></div>

        </div>
      </div>
      <div className={`loginOverlay ${loginVisible ? "is-active" : ""}`}
           onClick={handleLoginClose}/>
    </>
  )
}