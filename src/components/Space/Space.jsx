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
import {useMediaQuery} from "react-responsive";
import {useSpace} from "../../hooks/useSpace";

const Space = observer(({reCourse}) => {

    const {course} = useContext(Context)

    const {mobileSpace, desktopSpace} = useSpace({course, reCourse})

    const isMobile = useMediaQuery({query: '(max-width: 600px)'})

    // const {deadlineTasks} = useDeadlineList(course.courses)
    // const {dutyActive, exitFromDuty, goToDuty} = useDuty()

    // const funcActivateCourse = index => {
    //     course.setActiveCourse(index)
    //     setDesktopMode('tasks')
    // }
    // const toDuty = ({courseIndex, taskIndex}) => {
    //     goToDuty({courseIndex, taskIndex})
    //     setDesktopMode('duty')
    // }
    // const openConfig = () => setDesktopMode('config')


    return (
        <Container className='space'>
            {
                isMobile
                    ?
                    <>
                        {mobileSpace()}
                    </>
                    :
                    <>
                        {desktopSpace()}
                        {/*<CourseList*/}
                        {/*    funcActivateCourse={funcActivateCourse}*/}
                        {/*    isActiveConfig={desktopMode === 'config'}*/}
                        {/*    openConfig={openConfig}*/}
                        {/*/>*/}
                        {/*{middleBlock()}*/}
                        {/*<DeadlineList tasks={deadlineTasks} toDuty={toDuty} courses={course.courses}/>*/}
                    </>
            }

        </Container>
    );
});


export default Space;