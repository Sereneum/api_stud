import {DB_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SERVER_ROUTE,} from "./utils/consts";
import Login from "./components/Login";
import Main from "./components/Main";
import Db from "./components/Db/Db";
import Server from "./components/Db/Server";


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
        path: DB_ROUTE,
        Component: Db
    },
    {
        path: SERVER_ROUTE,
        Component: Server
    }
]