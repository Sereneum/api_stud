import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import Duty from "../components/Duty/Duty";
import TaskList from "../components/Space/TaskList/TaskList";
import Config from "../components/Space/Config/Config";
import DeadlineList from "../components/Space/DeadlineList/DeadlineList";
import {useDeadlineList} from "./useDeadlineList";
import CourseList from "../components/Space/CourseList/CourseList";
import {useMediaQuery} from "react-responsive";
import Schedule from "../components/Space/Schedule/Schedule";
import {Context} from "../index";
import {epoch_courseData} from "../epoch/epochServer";
import {preEpoch_reboot} from "../epoch/preEpoch";
import Menu from "../components/Space/Menu/Menu";

export const useSpace = ({course, reCourse, binder}) => {
    const activeCourseIndex = course.activeCourse
    const valueActiveCourse = course.courses[course.activeCourse]
    const [dutyActive, setDutyActive] = useState({courseIndex: -1, taskIndex: -1})
    const {deadlineTasks} = useDeadlineList({course})

    const isMobile = useMediaQuery({query: '(max-width: 1300px)'})

    // const [desktopMode, setDesktopMode] = useState('schedule')
    // const [mobileMode, setMobileMode] = useState('schedule')
    //
    const [desktopMode, setDesktopMode] = useState('menu')
    const [mobileMode, setMobileMode] = useState('menu')

    const [rebootLoader, setRebootLoader] = useState(false)



    const reboot = (course_id, index) => new Promise((re, rj) => {
        setRebootLoader(true)
        preEpoch_reboot(course_id, course.courses)
            .then(r => {
                course.setCourses(r)
                course.setActiveCourse(index)
                setRebootLoader(false)
                re(true)
            })
    })

    const desktopMove = {
        openDuty: ({courseIndex, taskIndex}) => {
            if (course.activeCourse !== courseIndex)
                course.setActiveCourse(courseIndex)
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
        },
        openSchedule: () => {
            setDesktopMode('schedule')
        },
        openMenu: () => {
            setDesktopMode('menu')
        }
    }

    const mobileMove = {
        openDuty: ({courseIndex, taskIndex}) => {
            if (course.activeCourse !== courseIndex)
                course.setActiveCourse(courseIndex)
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
        },
        openSchedule: () => {
            setMobileMode('schedule')
        },
        openMenu: () => {
            setMobileMode('menu')
        }
    }


    const course_list = <CourseList
        isActiveConfig={desktopMode === 'config'}
        isActiveSch={desktopMode === 'schedule'}
        isActiveMenu={desktopMode === 'menu'}
        desktopMove={desktopMove}
        mobileMove={mobileMove}
        desktopMode={desktopMode}
        reboot={reboot}
    />

    const task_list = <TaskList
        desktopMove={desktopMove}
        mobileMove={mobileMove}
        course={valueActiveCourse}
        activeCourseIndex={activeCourseIndex}
        rebootLoader={rebootLoader}
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

    const menu = <Menu />


    const [weekID, setWeekID] = useState(null)
    const [calendar, setCalender] = useState({})


    useEffect(() => {
        binder.setFunc('scheduleLink', () => {
            isMobile ? mobileMove.openSchedule() : desktopMove.openSchedule()
        })

        binder.setFunc('menuOpen', () => {
            isMobile ? mobileMove.openMenu() : desktopMove.openMenu()
        })

        binder.setFunc('setWeekID', () => {
            setWeekID(weekID)
        })

        binder.setFunc('loadCalendar', () => {
        })
    }, [])


    const middleBlock = () => {
        switch (desktopMode) {
            case 'config':
                return config
            case 'tasks':
                return task_list
            case 'duty':
                return duty
            case 'schedule':
                return <Schedule weekID={weekID}/>
            case 'menu':
                return menu
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
            case 'schedule':
                return <Schedule weekID={weekID} setCalender={setCalender}/>
            case 'menu':
                return menu
        }
    }


    return {mobileMove, mobileMode, mobileSpace, desktopSpace, desktopMode}
}

