import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {LOGIN_ROUTE} from "../utils/consts";
import {Button, Container, Form} from "react-bootstrap";
import {getCourseStatus} from "../http/studAPI";
import {parserCourseStatus} from "../parsers/parser";
import CourseListStatus from "./CourseComp/CourseListStatus";

const Main = observer(() => {

    const [courseId, setCourseId] = useState(7889)


    const courseStatus = (course_id) => {
        getCourseStatus(course_id).then(data => {
            console.log(parserCourseStatus(data.data))
            console.log(data.data)
        })
    }




    return (
        <Container className='d-flex justify-content-center align-content-center' style={{width: '50vw'}}>
           <CourseListStatus />
        </Container>
    );
});

export default Main;