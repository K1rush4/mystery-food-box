import './App.css'
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Error from "./pages/Error/Error.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            errorElement: <Error />,
        },
        {
            path: "/reg",
            element: <Registration />,
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
