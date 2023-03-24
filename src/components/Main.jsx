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
import {loadingCoursesOnMain, superFullLoadingCourses} from "../chain/serverConfig";

const Main = observer(() => {

    const [loadingCourse, setLoadingCourse] = useState(true)
    const {user, course} = useContext(Context)
    let id = user.user.anotherID


    const reCourse = () => {
        return new Promise((resolve, reject) => {
            superFullLoadingCourses({id}).then(d => {
                // console.log('d', d)
                course.setCourses(d.course)
                course.setFull(d.full)
                resolve(true)
                if(loadingCourse) setLoadingCourse(false)
            })
        })
    }

    useEffect(() => {
        // loadingCoursesOnMain(id).then(d => {
        //     course.setCourses(d)
        //     fullGetDataDuty(d).then(res => {
        //         let full_answer = []
        //         for(let i = 0; i < res.length; ++i) {
        //             full_answer.push({...res[i], course_name: d[i].course.course_name, course_id: d[i].course.course_id})
        //         }
        //         course.setFull(full_answer)
        //         setLoadingCourse(false)
        //     })
        // })
        // superFullLoadingCourses({id: id, mode: 'first'}).then(d => {
        //     course.setCourses(d.course)
        //     course.setFull(d.full)
        //     setLoadingCourse(false)
        // })
        reCourse().then()
    }, [course])


    if (loadingCourse) return <MySpinner/>

    return (
        <div>
            <Container className='d-flex justify-content-center align-content-center' style={{width: '50vw'}}>
                <Space reCourse={() => reCourse()}/>
            </Container>
        </div>
    );
});

export default Main;