import { createBrowserRouter } from "react-router-dom"
import Main from './../Layout/Main';
import Home from "../Pages/Home/Home";
import CardDetailsPage from "../Pages/CardDetailsPage/CardDetailsPage";  
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoute";
import AdminRoute from './AdminRout';
import AllUser from "../Pages/DashBoard/AdminAccess/AllUser/AllUser";
import MyBooking from './../Pages/DashBoard/UserAccess/MyBooking/MyBooking';





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
                element: <PrivateRoutes><CardDetailsPage />,</PrivateRoutes>
            
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/allUsers',
                element: <AdminRoute ><AllUser /></AdminRoute>
            },
            {
                path: '/myBooking',
                element: <PrivateRoutes><MyBooking /></PrivateRoutes>
            },
        ]
    },
    {
        path: '*',
    }
])