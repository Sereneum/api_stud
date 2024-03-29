import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from 'mobx-react-lite'
import React, {createContext, useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import MySpinner from "./components/MySpinner";
import Preloader from "./components/Preloader";
import Void from './components/Void'
import NavBar from "./components/Navbar/NavBar";
import {useMediaQuery} from "react-responsive";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loadingUser, setLoadingUser] = useState(true)


    useEffect(() => {
        check().then(data => {
            user.setIsAuth(data.dataState)
            user.setUser(data.dataUser)
            user.setDetailed(data.moreInfo)
        }).catch(e => {})
            .finally(() => setLoadingUser(false))
    }, [])


    if (loadingUser) return <Void/>

    return (
        <BrowserRouter>
            <NavBar isLoaded={user.isAuth}/>
            <AppRouter/>

        </BrowserRouter>
    );
})

export default App;
