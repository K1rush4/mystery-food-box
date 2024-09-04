import './App.css'
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Error from "./pages/Error/Error.tsx";
import {useState} from "react";
import Product from "./pages/Product/Product.tsx";

function App() {
    const [isLogin, setIsLogin] = useState(false);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home isLogin={isLogin} setIsLogin={setIsLogin}/>,
            errorElement: <Error />,
        },
        {
            path: "/reg",
            element: <Registration />,
            errorElement: <Error />,
        },
        {
            path: "/product",
            element: <Product />,
            errorElement: <Error />,
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
