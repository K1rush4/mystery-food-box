import "./Registration.css"
import Header from "../../components/Header/Header";
import React, {useState} from "react";
import AddressInput from "../../components/AddressInput/AddressInput.tsx";

export default function Registration() {
  const [burgerState, setBurgerState] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false);
  const [phone, setPhone] = useState('');

  function handlerLogin() {
    setLoginVisible(true);
  }

  const handleFocus = () => {
    if (phone === '') {
      setPhone('+7');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Форматирование ввода телефона: добавляем скобки и тире
    const formattedValue = formatPhoneNumber(inputValue);
    setPhone(formattedValue);
  };

  const formatPhoneNumber = (inputValue: string) => {
    const phoneNumber = inputValue.replace(/\D/g, '');
    let formattedPhoneNumber = '+7';
    if (phoneNumber.length > 1) {
      formattedPhoneNumber += ` (${phoneNumber.substring(1, 4)}`;
    }
    if (phoneNumber.length >= 5) {
      formattedPhoneNumber += `) ${phoneNumber.substring(4, 7)}`;
    }
    if (phoneNumber.length >= 8) {
      formattedPhoneNumber += `-${phoneNumber.substring(7, 9)}`;
    }
    if (phoneNumber.length >= 10) {
      formattedPhoneNumber += `-${phoneNumber.substring(9, 11)}`;
    }
    return formattedPhoneNumber;
  };


  return (
    <>
      <Header burgerState={burgerState}
              setBurgerState={setBurgerState}
              loginVisible={loginVisible}
              setLoginVisible={setLoginVisible}/>
      <main className={"regMain"}>
        <div className={"regWrapper"}>
          <div className={"regTextReg"}>Создание учетной записи</div>
          <div className={"regTextHaveAcc"}> Уже есть аккаунт? <u onClick={handlerLogin}>Войти</u></div>
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
              <input type="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
            </div>
            <div className={"regInput100"}>
              <label htmlFor="phone-input">Телефон</label>
              <input
                type="tel"
                id="phone-input"
                name="phone"
                value={phone}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="+7 (___) ___-__-__"
                pattern="(\+7)?\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}"
                required
              />
            </div>
            <div className={"regInput100"}>
              <label htmlFor="address"> Адрес доставки: </label>
              <AddressInput/>
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