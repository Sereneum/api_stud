import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import SpaceCourseList from "./Space/SpaceCourseList";
import {preloadingCourse} from "../http/studAPI";
import {settings} from "../utils/settings";
import {Context} from "../index";
import MySpinner from "./MySpinner";
import NavBar from "./NavBar";

const Main = observer(() => {



    const [loadingCourse, setLoadingCourse] = useState(true)
    const {user, course} = useContext(Context)

    useEffect(() => {
        preloadingCourse(settings.courses).then(data => {
            course.setCourses(data)
        }).finally(() => setLoadingCourse(false))
    }, [settings])

    if (loadingCourse) return <MySpinner/>


    return (
        <div>
            {/*<NavBar isLoaded={user.isAuth}/>*/}
            <Container className='d-flex justify-content-center align-content-center' style={{width: '50vw'}}>
                <SpaceCourseList/>
            </Container>
        </div>
    );
});

export default Main;