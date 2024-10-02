import './App.css'
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Error from "./pages/Error/Error.tsx";
import React, {createContext, useState} from "react";
import Product from "./pages/Product/Product.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Layout from "./pages/Layout/Layout.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import AuthRequired from "./pages/AuthRequired/AuthRequired.tsx";

interface ILoginContext {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultLoginContext: ILoginContext = {
  isLogin: false,
  setIsLogin: () => {},
};

export const LoginContext = createContext<ILoginContext>(defaultLoginContext);

function App() {
  const [burgerState, setBurgerState] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const router = createBrowserRouter([
    {
      element:
        <Layout
          burgerState={burgerState}
          setBurgerState={setBurgerState}
          loginVisible={loginVisible}
          setLoginVisible={setLoginVisible}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />,
      children: [
        {
          path: "/",
          element: <Home/>,
          errorElement: <Error/>,
        },
        {
          path: "/reg",
          element: <Registration setLoginVisible={setLoginVisible}/>,
          errorElement: <Error/>,
        },
        {
          path: "/product",
          element: <Product/>,
          errorElement: <Error/>,
        },
        {
          path: "/cart",
          element: isLogin ? <Cart/> : <AuthRequired/>,
          errorElement: <Error/>,
        },
        {
          path: "/profile",
          element: isLogin ? <Profile/> : <AuthRequired/>,
          errorElement: <Error/>,
        },
      ]
    }

  ]);

  return (
    <LoginContext.Provider value={{isLogin,setIsLogin}}>
      <RouterProvider router={router}/>
    </LoginContext.Provider>
  )
}

export default App
