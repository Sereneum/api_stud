import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import Space from "./Space/Space";
import {fullGetDataDuty, preloadingCourse} from "../http/studAPI";
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

    useEffect(() => {
        loadingCoursesOnMain(id).then(d => {
            course.setCourses(d)
            fullGetDataDuty(d).then(res => {
                let full_answer = []
                for(let i = 0; i < res.length; ++i) {
                    full_answer.push({...res[i], course_name: d[i].course.course_name, course_id: d[i].course.course_id})
                }
                course.setFull(full_answer)
                setLoadingCourse(false)
            })
        })
    }, [])


    if (loadingCourse) return <MySpinner/>

    return (
        <div>
            <Container className='d-flex justify-content-center align-content-center' style={{width: '50vw'}}>
                <Space/>
            </Container>
        </div>
    );
});

export default Main;