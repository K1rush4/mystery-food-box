import "./Registration.css"
import React, {useContext, useRef, useState} from "react";
import AddressInput from "../../components/AddressInput/AddressInput.tsx";
import {useNavigate} from "react-router-dom";
import {login, registration} from "../../http/userAPI.ts";
import {LoginContext} from "../../App.tsx";

// interface IRegistration {
//   setLoginVisible: (state: boolean) => void;
// }

// export default function Registration({setLoginVisible}:IRegistration) {
export default function Registration() {

  const [phone, setPhone] = useState('');
  const [isPasswordMismatch, setIsPasswordMismatch] = useState(false);
  const [inputFirstName, setInputFirstName] = useState('');
  const [inputSecondName, setInputSecondName] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordAgainRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setIsLogin } = useContext(LoginContext);

  const handleFocusPhone = () => {
    if (phone === '') {
      setPhone('+7');
    }
  };

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    setPhone(formattedValue);
  };

  const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredFirstName = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
    setInputFirstName(filteredFirstName);
  };

  const handleChangeSecondName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredSecondName = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, '');
    setInputSecondName(filteredSecondName);
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

  const handleReg = () => {
    if (passwordRef.current?.value !== passwordAgainRef.current?.value) {
      setIsPasswordMismatch(true);
    }
  };

  const handleFocusPass = () => {
    setIsPasswordMismatch(false)
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const password = passwordRef.current?.value || '';
    const passwordAgain = passwordAgainRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const name = nameRef.current?.value || '';
    const surname = surnameRef.current?.value || '';
    const address = addressRef.current?.value || '';

    const allFieldsFilled = [password, passwordAgain, email, name, surname, address].every(field => field.trim() !== '');
    const passwordsMatch = password === passwordAgain;

    if (allFieldsFilled && passwordsMatch) {
      const token = await registration(name, surname, email, phone, address, password, "USER")
      if (token) {
        const token = await login(email, password)
        if (token) {
          setIsLogin(true)
        }
        navigate('/')
      }
    }
  };

  return (
    <>
      <main className={"regMain"}>
        <div className={"regWrapper"}>
          <div className={"regTextReg"}>Создание учетной записи</div>
          <form className={"regForm"} onSubmit={handleSubmit}>
            <div className={"regInput50"}>
              <div>
                <label htmlFor="secondName"> Фамилия: </label>
                <input type="text" id="secondName" value={inputSecondName} ref={surnameRef} onInput={handleChangeSecondName} required/>
              </div>
              <div>
                <label htmlFor="firstName"> Имя: </label>
                <input type="text" id="firstName" value={inputFirstName} ref={nameRef} onInput={handleChangeFirstName} required/>
              </div>
            </div>
            <div className={"regInput100"}>
              <label htmlFor="email"> Электронная почта: </label>
              <input type="email" id="email" ref={emailRef} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required/>
            </div>
            <div className={"regInput100"}>
              <label htmlFor="phone-input">Телефон</label>
              <input
                type="tel"
                id="phone-input"
                name="phone"
                value={phone}
                onChange={handleChangePhone}
                onFocus={handleFocusPhone}
                placeholder="+7 (___) ___-__-__"
                pattern="(\+7)?\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}"
                required
              />
            </div>
            <div className={"regInput100"}>
              <label htmlFor="address"> Адрес доставки: </label>
              <AddressInput addressRef={addressRef}/>
            </div>
            <div className={"regInput50"}>
              <div>
                <label htmlFor="pass">Пароль: </label>
                <input type="password" id="pass" ref={passwordRef} onFocus={handleFocusPass} required/>
              </div>
              <div>
                <label htmlFor="passAgain">Повторите пароль: </label>
                <input type="password" id="passAgain" ref={passwordAgainRef} onFocus={handleFocusPass} required/>
              </div>
            </div>
            <div className={"regInput50"}>
              <div/>
              <div className={"passNotMatch"} style={{visibility: isPasswordMismatch ? 'visible' : 'hidden'}}>Пароли
                не совпадают!
              </div>
            </div>
            <button className={"regButtonCreateAcc"} onClick={handleReg} type="submit">Создать аккаунт</button>
          </form>
        </div>
      </main>
    </>
  )
}