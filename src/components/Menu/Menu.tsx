import "./Menu.css"
import {menuList} from "../../assets/data.ts"
import {useEffect} from "react";

interface IMenu {
    burgerState: boolean;
    setBurgerState: (arg0: boolean) => void;
}

export default function Menu({burgerState, setBurgerState}: IMenu) {

    //ToDo fetch menuList

    function MenuItems() {
        return (
            menuList.map((item, index) => (
                <a href={"/" + item.url} key={index}>
                    <div className={"menuRow"}>
                        <img className={"menuImg"} src="/public/images/menu-box.svg"/>
                        <div>{item.text}</div>
                    </div>
                </a>
            ))
        )
    }

    useEffect(() => {
        const burgerElement = document.getElementById('burger');
        if (burgerElement) {
            burgerElement.className = `menuWrapper ${burgerState ? 'burgerON' : 'burgerOFF'}`;
        }
    }, [burgerState]);

    function handleBurgerClose() {
        setBurgerState(false)
    }

    return (
        <>
            <aside className={"menuWrapper"} id="burger">
                <img className={"menuLogoImg"} src="/images/logo.avif"/>
                {MenuItems()}
            </aside>
            <div className={`overlayMenu ${burgerState ? "is-active" : ""}`}
                 onClick={handleBurgerClose}/>
        </>

    )
}