import "./Registration.css"
import Header from "../../components/Header/Header";
import {useState} from "react";

export default function Registration() {
    const [burgerState, setBurgerState] = useState(false)
    const [loginVisible, setLoginVisible] = useState(false);

    return (
        <>
            <Header burgerState={burgerState}
                    setBurgerState={setBurgerState}
                    setLoginVisible={setLoginVisible}/>
            <main className={"regMain"}>
                <div className={"regWrapper"}>
                    <div className={"regTextReg"}>Создание учетной записи</div>
                    <div className={"regTextHaveAcc"}> Уже есть аккаунт? <u>Войти</u></div>
                    <form className={"regForm"}>
                        <div className={"regInput50"}>
                            <div>
                                <label htmlFor="secondName"> Фамилия: </label>
                                <input type="text" id="secondName" required/>
                            </div>
                            <div>
                                <label htmlFor="firstName"> Имя: </label>
                                <input type="text" id="firstName" required/>
                            </div>
                        </div>
                        <div className={"regInput100"}>
                            <label htmlFor="email"> Электронная почта: </label>
                            <input type="email" id="email" pattern=".+@example\.com" size="30" required/>
                        </div>
                        <div className={"regInput100"}>
                            <label htmlFor="phone"> Телефон: </label>
                            <input type="tel" id="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
                        </div>
                        <div className={"regInput100"}>
                            <label htmlFor="address"> Адрес доставки: </label>
                            <input type="text" id="address" required/>
                        </div>
                        <div className={"regInput50"}>
                            <div>
                                <label htmlFor="pass">Пароль: </label>
                                <input type="password" id="pass" required/>
                            </div>
                            <div>
                                <label htmlFor="passAgain">Повторите пароль: </label>
                                <input type="password" id="passAgain" required/>
                            </div>
                        </div>
                        <button className={"regButtonCreateAcc"}>Создать аккаунт</button>
                    </form>
                </div>
            </main>
        </>

    )
}