import './App.css'
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Error from "./pages/Error/Error.tsx";
import React, {createContext, useEffect, useState} from "react";
import Product from "./pages/Product/Product.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Layout from "./pages/Layout/Layout.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import AuthRequired from "./pages/AuthRequired/AuthRequired.tsx";
import AdminPanel from "./pages/AdminPanel/AdminPanel.tsx";
import {jwtDecode} from "jwt-decode";

interface ILoginContext {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean
}

const defaultLoginContext: ILoginContext = {
  isLogin: false,
  setIsLogin: () => {},
  isAdmin: false
};

export const LoginContext = createContext<ILoginContext>(defaultLoginContext);

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setIsLogin(true);
          if (decoded.role === "ADMIN") {
            setIsAdmin(true);
          }
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const router = createBrowserRouter([
    {
      element:
        <Layout />,
      children: [
        {
          path: "/",
          element: <Home/>,
          errorElement: <Error/>,
        },
        {
          path: "/reg",
          element: <Registration />,
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
        {
          path: "/admin",
          element: isAdmin ? <AdminPanel/> : <AuthRequired/>,
          errorElement: <Error/>,
        },
      ]
    }

  ]);

  return (
    <LoginContext.Provider value={{isLogin,setIsLogin, isAdmin}}>
      <RouterProvider router={router}/>
    </LoginContext.Provider>
  )
}

export default App
