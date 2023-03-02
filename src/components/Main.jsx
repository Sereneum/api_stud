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

const Main = observer(() => {

    const [loadingCourse, setLoadingCourse] = useState(true)
    const {user, course} = useContext(Context)

    useLoading(
        {
            func: preloadingCourse,
            args: settings.courses,
            setter: d => course.setCourses(d),
            loader: () => setLoadingCourse(false)
        }
    ).then()



    if (loadingCourse) return <MySpinner/>
    console.log(course.courses)

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