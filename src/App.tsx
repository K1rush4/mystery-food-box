import './App.css'
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import Error from "./pages/Error/Error.tsx";
import {useState} from "react";
import Product from "./pages/Product/Product.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Header from "./components/Header/Header.tsx";

function App() {
  const [burgerState, setBurgerState] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const Layout = () => (
    <>
      <Header
        burgerState={burgerState}
        setBurgerState={setBurgerState}
        loginVisible={loginVisible}
        setLoginVisible={setLoginVisible}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
      <Outlet/>
    </>
  );

  const router = createBrowserRouter([
    {
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home burgerState={burgerState} setBurgerState={setBurgerState}/>,
          errorElement: <Error/>,
        },
        {
          path: "/reg",
          element: <Registration/>,
          errorElement: <Error/>,
        },
        {
          path: "/product",
          element: <Product/>,
          errorElement: <Error/>,
        },
        {
          path: "/cart",
          element: <Cart/>,
          errorElement: <Error/>,
        },
      ]
    }

  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
