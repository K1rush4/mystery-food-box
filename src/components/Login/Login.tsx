import "./Login.css"
import {useEffect} from "react";

interface ILogin {
    loginVisible: boolean;
    setLoginVisible: (boolean) => void;
}

export default function Login({loginVisible, setLoginVisible}: ILogin) {

    useEffect(() => {
        const loginWindow = document.getElementById('loginWindowId');
        if (loginWindow) {
            loginWindow.className = `loginWindow ${loginVisible ? "is-active" : ""}`;
        }
    }, [loginVisible]);

    function handleLoginClose() {
        setLoginVisible(false)
    }

    return (
        <>
            <div id={"loginWindowId"}>
                <div className={"loginCloseButton"}>
                    <img src="public/images/close.svg" onClick={handleLoginClose}/>
                </div>
                <div className={"loginWrapper"}>
                    <img className={"loginLogoImg"} src="public/images/logo.avif"/>
                    <form className={"loginForm"}>
                        <div>
                            <label htmlFor="login"> Логин: </label>
                            <input type="text" id="login"/>
                        </div>
                        <div>
                            <label htmlFor="password">Пароль: </label>
                            <input type="password" id="password"/>
                        </div>
                    </form>
                    <div className={"loginLoginButton"}>
                        <button>Войти</button>
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