import "./Login.css"
import {useContext, useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {login} from "../../http/userAPI.ts";
import {LoginContext} from "../../App.tsx";
import {AxiosError} from "axios";

interface ILogin {
  loginVisible: boolean;
  setLoginVisible: (arg0: boolean) => void;
}

export default function Login({loginVisible, setLoginVisible}: ILogin) {
  const { setIsLogin } = useContext(LoginContext);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
  }

  async function handleLogin() {
    setError(null);
    try {
      const token = await login(loginRef.current!.value, passwordRef.current!.value)
      if (token) {
        setIsLogin(true)
        setLoginVisible(false);
      }
    } catch (e) {
      if (e instanceof AxiosError && e.response?.data?.message) {
        setError(e.response.data.message);
      } else {
        setError('Ошибка входа. Попробуйте ещё раз.');
      }
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
              <input type="text" id="login" autoComplete="username" ref={loginRef}/>
            </div>
            <div>
              <label htmlFor="password">Пароль: </label>
              <input type="password" id="password" autoComplete="current-password" ref={passwordRef}/>
            </div>
          </form>
            {error && <div className={"loginError"}>{error}</div>}
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