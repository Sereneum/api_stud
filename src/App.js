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
import {settings} from "./utils/settings";
import {loadingCourse, preloadingCourse} from "./http/studAPI";

const App = observer(() => {
    const {user, course} = useContext(Context)
    const [loadingUser, setLoadingUser] = useState(true)
    const [loadingCourse, setLoadingCourse] = useState(true)


    useEffect(() => {
        check().then(data => {
            user.setIsAuth(data.dataState)
            user.setUser(data.dataUser)
            user.setMoreInfo(data.moreInfo)
        }).finally(() => setLoadingUser(false))
    }, [])

    useEffect(() => {
        preloadingCourse(settings.courses).then(data => {
            course.setCourses(data)
        }).finally(() => setLoadingCourse(false))
    }, [settings])


    if (loadingUser || loadingCourse) return <MySpinner />

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>

    );
})

export default App;
