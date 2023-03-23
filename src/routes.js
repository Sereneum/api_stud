import {CONFIG_ROUTE, DUTY_ROUTE, MAIN_ROUTE, UI_ROUTE} from "./utils/consts";
import Login from "./components/Login/Login";
import Main from "./components/Main";
import Config from "./components/Space/Config/Config";
import Duty from "./components/Duty/Duty";
import TestUI from "./components/TestUI/TestUI";


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
    },
    {
        path: DUTY_ROUTE,
        Component: Duty
    },
    {
        path: UI_ROUTE,
        Component: TestUI
    }
]