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
import Duty from "../Duty/Duty";

const Space = observer(({reCourse}) => {

    const {course} = useContext(Context)
    const [isActiveConfig, setIsActiveConfig] = useState(false)

    const clickOnConfig = () => {
        if (!isActiveConfig) setIsActiveConfig(!isActiveConfig)
    }

    const [dutyActive, setDutyActive] = useState({isActive: false, taskIndex: -1, courseIndex: -1})

    const funcActivateCourse = (index) => {
        if (dutyActive.isActive) toBack()
        if (isActiveConfig) setIsActiveConfig(false)
        course.setActiveCourse(index)
    }

    const [deadlineTasks, setDeadlineTasks] = useState([])

    useEffect(() => {
        setDeadlineTasks(createDeadlines())
    }, [course.courses])

    const toBack = () => {
        setDutyActive({isActive: false, taskIndex: -1, courseIndex: -1})
    }
    const toDuty = ({courseIndex, taskIndex}) => {
        setDutyActive({
            isActive: true,
            taskIndex: taskIndex,
            courseIndex: courseIndex
        })
        if(course.activeCourse !== courseIndex)
            course.setActiveCourse(courseIndex)
        if(isActiveConfig) {
            setIsActiveConfig(false)
        }

    }

    const createDeadlines = () => {
        let tasks = []
        for (let cour of course.courses)
            for (let task of cour.tasks)
                if (!task.statusID) tasks.push(task)

        return tasks.slice(-3).sort((a, b) => a.deadline - b.deadline)
    }

    // ##################
    useEffect(() => {
       // setDutyActive({
       //     courseIndex: 2,
       //     taskIndex: 0,
       //     isActive: true
       // })
    }, [])
    // ##################

    return (
        <Container className='space'>
            <CourseList
                courses={course.courses}
                activeCourse={course.activeCourse}
                funcActivateCourse={funcActivateCourse}
                isActiveConfig={isActiveConfig}
                clickOnConfig={clickOnConfig}
            />
            {
                isActiveConfig
                    ?
                    <Config reCourse={reCourse}/>
                    :
                    dutyActive.isActive
                        ?
                        <Duty
                            course={course.courses[dutyActive.courseIndex]}
                            task={course.courses[dutyActive.courseIndex].tasks[dutyActive.taskIndex]}
                            toBack={toBack}
                        />
                        :
                        <TaskList
                            toDuty={toDuty}
                            course={course.courses[course.activeCourse]}
                            activeCourse={course.activeCourse}
                        />
            }
            <DeadlineList tasks={deadlineTasks} toDuty={toDuty} courses={course.courses}/>
        </Container>
    );
});


export default Space;