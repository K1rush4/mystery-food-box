import "./Burger.css"
import {useEffect} from "react";
import MenuList from "../MenuList/MenuList.tsx";

interface IMenu {
    burgerState: boolean;
    setBurgerState: (arg0: boolean) => void;
}

export default function Burger({burgerState, setBurgerState}: IMenu) {


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
                {MenuList()}
            </aside>
            <div className={`overlayMenu ${burgerState ? "is-active" : ""}`}
                 onClick={handleBurgerClose}/>
        </>

    )
}