import "./Header.css"

interface IHeader {
    burgerState: boolean;
    setBurgerState: (state: boolean) => void;
    setLoginVisible: (state: boolean) => void;
}

export default function Header({burgerState, setBurgerState, setLoginVisible}:IHeader) {
    function handlerBurgerClick() {
        setBurgerState(!burgerState)
    }

    function handleLoginClick() {
        setLoginVisible(true);
    }

    return (
        <header className={"wrapperHeader"}>
            <div className={"headerBlock"}>
                <div className={"headerLogoBlock"}>
                    <img src="public/images/hamburger.svg" className={"headerBurger"} onClick={handlerBurgerClick}/>
                    <a href={"/"}>
                        <div className={"headerNameToMain"}>
                            <img className={"headerLogoImg"} src="public/images/logo.avif"/>
                            <div className={"headerLogoText"}>Mistery foooood box</div>
                        </div>
                    </a>

                </div>
                <nav className={"headerNav"}>
                    <div>Меню</div>
                    <div>Доставка</div>
                    <div>О нас</div>
                    <button className={"loginButton"} onClick={handleLoginClick}>
                        <img className={"loginButtonImg"} src="/images/login.svg" />
                        <span>Войти</span>
                    </button>
                </nav>
            </div>
        </header>

    )
}