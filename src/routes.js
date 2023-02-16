import {LOGIN_ROUTE, MAIN_ROUTE,} from "./utils/consts";
import Login from "./components/Login";
import Main from "./components/Main";

export const anonRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Login
    }
]

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    }
]