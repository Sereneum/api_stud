import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import './Space.css'
import '../../index.css'
import Task from "./TaskList/Task";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import CourseList from "./CourseList/CourseList";
import TaskList from "./TaskList/TaskList";
import DeadlineList from "./DeadlineList/DeadlineList";
import Config from "./Config/Config";
import {preloadingCourse} from "../../http/studAPI";

const Space = observer(() => {

    const {course} = useContext(Context)
    const [isActiveConfig, setIsActiveConfig] = useState(false)

    const updateCourseFromConfig = (updatedCoursesList) => {
        preloadingCourse(updatedCoursesList).then(d => course.setCourses(d))
    }

    const clickOnConfig = () => {
        if(!isActiveConfig) setIsActiveConfig(!isActiveConfig)
    }


    const activeCourse = (index) => {
        if(isActiveConfig) setIsActiveConfig(false)
        course.setActiveCourse(index)
    }

    const [deadlineTasks, setDeadlineTasks] = useState([])

    useEffect(() => {
        setDeadlineTasks(allTasks())
    }, [course.courses])

    const allTasks = () => {
        try {
            let tasks = []
            for (let cour of course.courses) {
                for (let task of cour.tasks) {
                    if (task.statusID === 0) tasks.push(task)
                }
            }
            return tasks.sort((a, b) => a.deadline - b.deadline)
        } catch (e) {
        }
    }


    return (
        <Container className='space'>
            <CourseList course={course} activeCourse={activeCourse} isActiveConfig={isActiveConfig} clickOnConfig={clickOnConfig}/>
            {
                isActiveConfig
                    ?
                    <Config updateCourseFromConfig={updateCourseFromConfig}/>
                    :
                    <TaskList course={course}/>
            }
            <DeadlineList tasks={deadlineTasks}/>
        </Container>
    );
});


export default Space;