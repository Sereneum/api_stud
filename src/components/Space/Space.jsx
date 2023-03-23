import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import './Space.css'
import '../../index.css'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import CourseList from "./CourseList/CourseList";
import TaskList from "./TaskList/TaskList";
import DeadlineList from "./DeadlineList/DeadlineList";
import Config from "./Config/Config";
import {preloadingCourse} from "../../http/studAPI";
import Duty from "../Duty/Duty";
import {superFullLoadingCourses} from "../../chain/serverConfig";

const Space = observer(({reCourse}) => {

    const {course} = useContext(Context)
    const [isActiveConfig, setIsActiveConfig] = useState(false)

    const updateCourseFromConfig = (updatedCoursesList) => {
        // preloadingCourse(updatedCoursesList).then(d => course.setCourses(d))
        // console.log('updatedCoursesList', updatedCoursesList)
        // superFullLoadingCourses({update: updatedCoursesList, mode: 'update'})
        reCourse()
    }

    const clickOnConfig = () => {
        if (!isActiveConfig) setIsActiveConfig(!isActiveConfig)
    }

    const [dutyActive, setDutyActive] = useState({isActive: false, task_id: -1, course_id: -1})


    const activeCourse = (index) => {
        if(dutyActive.isActive) toBack()
        if (isActiveConfig) setIsActiveConfig(false)
        course.setActiveCourse(index)
    }

    const [deadlineTasks, setDeadlineTasks] = useState([])

    useEffect(() => {
        setDeadlineTasks(allTasks())
    }, [course.courses])

    const toBack = () => {
        setDutyActive({isActive: false, task_id: -1, course_id: -1})
    }
    const toDuty = (task_id, course_id) => {
        setDutyActive({
            isActive: true,
            task_id: task_id,
            course_id: course_id
        })
    }



    const allTasks = () => {
        try {
            let tasks = []
            for (let cour of course.courses)
                for (let task of cour.tasks)
                    if (task.statusID === 0) tasks.push(task)

            return tasks.sort((a, b) => a.deadline - b.deadline)
        } catch (e) {
        }
    }


    const centerWin = () => {
        if(isActiveConfig) return <Config updateCourseFromConfig={updateCourseFromConfig}/>
        else {
            if(dutyActive.isActive)
                return <Duty
                    full={course.full[dutyActive.course_id]}
                    task_id={dutyActive.task_id}
                    toBack={toBack}
                />
            else
                return <TaskList course={course} toDuty={toDuty}/>
        }
    }

    // ##################
    useEffect(() => {
        setTimeout(() => {toDuty(0, 0)}, 0)
    }, [])
    // ##################

    return (
        <Container className='space'>
            <CourseList course={course} activeCourse={activeCourse} isActiveConfig={isActiveConfig}
                        clickOnConfig={clickOnConfig}/>
            {
                centerWin()
            }
            <DeadlineList tasks={deadlineTasks}/>
        </Container>
    );
});


export default Space;