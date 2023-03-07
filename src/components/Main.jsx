import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import Space from "./Space/Space";
import {preloadingCourse} from "../http/studAPI";
import {settings} from "../utils/settings";
import {Context} from "../index";
import MySpinner from "./MySpinner";
import NavBar from "./Navbar/NavBar";
import {useLoading} from "../hooks/useLoading";
import {loadingCoursesOnMain} from "../chain/serverConfig";

const Main = observer(() => {

    const [loadingCourse, setLoadingCourse] = useState(true)
    const {user, course} = useContext(Context)
    let id = user.user.anotherID

    // useLoading(
    //     {
    //         func: preloadingCourse,
    //         args: settings.courses,
    //         setter: d => course.setCourses(d),
    //         loader: () => setLoadingCourse(false)
    //     }
    // ).then()


    useEffect(() => {
        loadingCoursesOnMain(id).then(d => {
            course.setCourses(d)
            setLoadingCourse(false)
            // console.log('loadingCoursesOnMain: ', d)
        })
    }, [])





    if (loadingCourse) return <MySpinner/>


    let c = {
        course_id: null,
        course_name: null,
    }

    return (
        <div>
            <Container className='d-flex justify-content-center align-content-center' style={{width: '50vw'}}>
                <Space/>
            </Container>
        </div>
    );
});

export default Main;