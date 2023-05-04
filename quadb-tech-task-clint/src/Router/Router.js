import { createBrowserRouter } from "react-router-dom"
import Main from './../Layout/Main';
import Home from "../Pages/Home/Home";
import CardDetailsPage from "../Pages/CardDetailsPage/CardDetailsPage";





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
                loader: async ({ params }) => await fetch(`https://api.tvmaze.com/search/shows?q=all?show?`),
                element: <CardDetailsPage />,
            
            }
        ]
    },
    {
        path: '*',
    }
])