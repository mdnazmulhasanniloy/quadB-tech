import { createBrowserRouter } from "react-router-dom"
import Main from './../Layout/Main';
import Home from "../Pages/Home/Home";
import CardDetailsPage from "../Pages/CardDetailsPage/CardDetailsPage";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Home/Register/Register";





export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: `/cardDetails/:id`,
                loader: async ({ params }) => await fetch(`https://api.tvmaze.com/search/shows?q=all`),
                element: <CardDetailsPage />,
            
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        path: '*',
    }
])