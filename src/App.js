import {BrowserRouter, useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from 'mobx-react-lite'
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {LOGIN_ROUTE} from "./utils/consts";
import {check, moreInfo} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import MySpinner from "./components/MySpinner";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        check().then(data => {
            user.setIsAuth(data.dataState)
            user.setUser(data.dataUser)
            user.setMoreInfo(data.moreInfo)
        }).finally(() => setLoading(false))
    }, [])


    if (loading) return <MySpinner />

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>

    );
})

export default App;
