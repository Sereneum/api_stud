import {CONFIG_ROUTE, MAIN_ROUTE} from "./utils/consts";
import Login from "./components/Login/Login";
import Main from "./components/Main";
import Config from "./components/Space/Config/Config";


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
    },
    {
        path: CONFIG_ROUTE,
        Component: Config
    }
]