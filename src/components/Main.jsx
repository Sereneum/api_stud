import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Container} from "react-bootstrap";
import Space from "./Space/Space";
import {Context} from "../index";
import MySpinner from "./MySpinner";
import {epoch_allCourseData, epoch_courseData} from "../epoch/epochServer";
import {preEpoch_reconstructionCourses} from "../epoch/preEpoch";

const Main = observer(() => {

    const [loadingCourse, setLoadingCourse] = useState(true)
    const {user, course} = useContext(Context)
    let id = user.user.anotherID


    const reCourse = (before, after) => {
        return new Promise((resolve, reject) => {
            preEpoch_reconstructionCourses(before, after, course.courses)
                .then(r => {
                    course.setCourses(r)
                    console.log(r)
                    resolve(true)
                })
        })
    }

    // const reTasks = (courseID) => {
    //
    //     let course_name = ''
    //     for (let c of course.courses)
    //         if (c.course_id === courseID)
    //             course_name = c.course_name
    //     console.log(courseID, course_name)
    //     epoch_courseData(courseID, course_name)
    //         .then(r => {
    //             console.log('rebuild course: ', r)
    //             course.setCourses(course.courses.map(
    //                 obj => obj.course_id === courseID ? r : obj
    //             ))
    //         })
    // }

    useEffect(() => {
        epoch_allCourseData(id).then(r => {
            console.log('Main: ', r)
            course.setCourses(r)
            if(loadingCourse) setLoadingCourse(false)
        })
    }, [])

    if (loadingCourse) return <MySpinner/>

    return (
        <div>
            <Container className='d-flex justify-content-center align-content-center' style={{width: '50vw', marginBottom: '70px'}}>
                <Space reCourse={reCourse}/>
            </Container>
        </div>
    );
});

export default Main;