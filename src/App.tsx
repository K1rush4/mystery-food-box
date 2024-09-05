import './App.css'
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import {createBrowserRouter,  RouterProvider} from "react-router-dom";
import Error from "./pages/Error/Error.tsx";
import {useState} from "react";
import Product from "./pages/Product/Product.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import Layout from "./pages/Layout/Layout.tsx";

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
          element: <Home burgerState={burgerState} setBurgerState={setBurgerState}/>,
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
          element: <Cart/>,
          errorElement: <Error/>,
        },
      ]
    }

  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
