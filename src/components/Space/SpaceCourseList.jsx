import React, {useContext, useEffect, useState} from 'react';
import {getCourseStatus, loadingCourse} from "../../http/studAPI";
import {settings} from "../../utils/settings";
import {Container, ListGroup} from "react-bootstrap";
import './Space.css'
import '../../index.css'
import Task from "./Task";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import CourseItem from "./CourseItem";

const SpaceCourseList = observer(() => {

    const {course} = useContext(Context)


    const activeCourse = (index) => {
        course.setActiveCourse(index)
    }

    return (
        <Container className='space'>
            <Container className='courses-block'>
                <div className='course-title font_M_Ying_Hei'>Ваши курсы</div>
                <div className='course-list'>
                    {
                        course.courses.map((i, index) => <CourseItem key={i.course_id} isActive={index === course.activeCourse} course={i.course} click={activeCourse} index={index}/>)
                    }
                </div>
            </Container>
            <div className='tasks-block'>
                <div className='course-title-in-tasks'>{course.courses ? course.courses[course.activeCourse].course.course_name : 'пусто'}</div>
                <div className='tasks-list'>
                    {course.courses[course.activeCourse].tasks.map((i, index) => <Task key={`t${index}`} index={index + 1} task={i} size={course.courses[course.activeCourse].tasks.length}/>)}
                </div>
            </div>
        </Container>
    );
});


export default SpaceCourseList;