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
import {useDeadlineList} from "../../hooks/useDeadlineList";
import {useConfig} from "../../hooks/useConfig";
import {useDuty} from "../../hooks/useDuty";

const Space = observer(({reCourse}) => {

    const {course} = useContext(Context)

    const [mode, setMode] = useState('tasks')
    const activeCourseIndex = course.activeCourse
    const valueActiveCourse = course.courses[course.activeCourse]

    const {isActiveConfig} = useConfig()
    const {deadlineTasks} = useDeadlineList(course.courses)
    const {dutyActive, exitFromDuty, goToDuty} = useDuty()

    const funcActivateCourse = index => {
        course.setActiveCourse(index)
        setMode('tasks')
    }
    const toDuty = ({courseIndex, taskIndex}) => {
        goToDuty({courseIndex, taskIndex})
        setMode('duty')
    }

    const toBack = () => {
        exitFromDuty()
        setMode('tasks')
    }

    const openConfig = () => {
        setMode('config')
    }


    return (
        <Container className='space'>
            <CourseList
                funcActivateCourse={funcActivateCourse}
                isActiveConfig={mode === 'config'}
                openConfig={openConfig}
            />
            <>
                {
                    mode === 'config'
                    &&
                    <Config reCourse={reCourse}/>
                }
            </>
            <>
                {
                    mode === 'tasks'
                    &&
                    <TaskList
                        toDuty={toDuty}
                        course={valueActiveCourse}
                        activeCourse={activeCourseIndex}
                    />
                }
            </>
            <>
                {
                    mode === 'duty'
                    &&
                    <Duty
                        dutyActive={dutyActive}
                        toBack={toBack}
                    />
                }
            </>

            <DeadlineList tasks={deadlineTasks} toDuty={toDuty} courses={course.courses}/>
        </Container>
    );
});


export default Space;