import React, {useEffect, useState} from "react";
import Duty from "../components/Duty/Duty";
import TaskList from "../components/Space/TaskList/TaskList";
import Config from "../components/Space/Config/Config";
import DeadlineList from "../components/Space/DeadlineList/DeadlineList";
import {useDeadlineList} from "./useDeadlineList";
import CourseList from "../components/Space/CourseList/CourseList";
import {useMediaQuery} from "react-responsive";

export const useSpace = ({course, reCourse}) => {
    const activeCourseIndex = course.activeCourse
    const valueActiveCourse = course.courses[course.activeCourse]
    const [dutyActive, setDutyActive] = useState({courseIndex: -1, taskIndex: -1})
    const {deadlineTasks} = useDeadlineList(course.courses)

    const isMobile = useMediaQuery({query: '(max-width: 1000px)'})
    const [desktopMode, setDesktopMode] = useState('tasks')
    const [mobileMode, setMobileMode] = useState('courses')

    // useEffect(() => {
    //     console.log('desktopMode: ', desktopMode)
    // }, [desktopMode])
    // useEffect(() => {
    //     console.log('mobileMode: ', mobileMode)
    // }, [mobileMode])


    const desktopMove = {
        openDuty: ({courseIndex, taskIndex}) => {
            // console.log({courseIndex, taskIndex})
            setDutyActive({courseIndex, taskIndex})
            setDesktopMode('duty')
        },
        openConfig: () => {
            setDesktopMode('config')
        },
        openCourse: (index = activeCourseIndex) => {
            if (course.activeCourse !== index)
                course.setActiveCourse(index)
            setDesktopMode('tasks')
        }
    }

    const mobileMove = {
        openDuty: ({courseIndex, taskIndex}) => {
            setDutyActive({courseIndex, taskIndex})
            setMobileMode('duty')
        },
        openConfig: () => {
            setMobileMode('config')
        },
        openCourse: (index = activeCourseIndex) => {
            if (course.activeCourse !== index)
                course.setActiveCourse(index)
            setMobileMode('tasks')
        },
        openCourseList: () => {
            setMobileMode('courses')
        },
        openDeadlines: () => {
            setMobileMode('deadlines')
        }
    }


    const course_list = <CourseList
        isActiveConfig={desktopMode === 'config'}
        desktopMove={desktopMove}
        mobileMove={mobileMove}
    />

    const task_list = <TaskList
        desktopMove={desktopMove}
        mobileMove={mobileMove}
        course={valueActiveCourse}
        activeCourseIndex={activeCourseIndex}
    />

    const duty = <Duty
        dutyActive={dutyActive}
        desktopMove={desktopMove}
        mobileMove={mobileMove}
    />

    const config = <Config
        reCourse={reCourse}
        desktopMove={desktopMove}
        mobileMove={mobileMove}/>

    const deadline_list = <DeadlineList
        tasks={deadlineTasks}
        desktopMove={desktopMove}
        mobileMove={mobileMove}
        courses={course.courses}/>


    const middleBlock = () => {
        switch (desktopMode) {
            case 'config':
                return config
            case 'tasks':
                return task_list
            case 'duty':
                return duty
        }
    }

    const desktopSpace = () => {
        return <>
            {course_list}
            {middleBlock()}
            {deadline_list}
        </>
    }

    const mobileSpace = () => {
        switch (mobileMode) {
            case 'config':
                return config
            case 'tasks':
                return task_list
            case 'duty':
                return duty
            case 'deadlines':
                return deadline_list
            case 'courses':
                return course_list
        }
    }


    return {mobileMove, mobileMode, mobileSpace, desktopSpace}
}

