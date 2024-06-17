import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import AddressInput from "./components/AddressInput/AddressInput";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddressInput />
    </>
  )
}

export default App
