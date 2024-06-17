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
                123
                <button onClick={handleLoginClose}>Крестик</button>
            </div>
            <div className={`loginOverlay ${loginVisible ? "is-active" : ""}`}
                 onClick={handleLoginClose}/>
        </>
    )
}